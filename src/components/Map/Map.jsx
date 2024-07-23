// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../../map.css";
import "../../styles/tailwind.css";
import { locations } from "../../data";
import Search from "./Search";

export default function Map() {
  maptilersdk.config.apiKey = "i10L3MwNCIbub5Dvmg3m";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const poland = { lng: 19.1451, lat: 51.9194 };
  const zoom = 5.5;
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location?.search || "/";

  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.getAll("category");

  const displayedLocation = typeFilter.length
    ? locations.filter((item) => typeFilter.includes(item.category))
    : locations;

  useEffect(() => {
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/streets-v2/style.json?key=i10L3MwNCIbub5Dvmg3m",
        center: [poland.lng, poland.lat],
        zoom: zoom,
      });

      map.current.on("load", () => {
        // Convert locations to GeoJSON format
        const geojson = {
          type: "FeatureCollection",
          features: displayedLocation.map((loc) => ({
            type: "Feature",
            properties: { id: loc.id },
            geometry: {
              type: "Point",
              coordinates: [loc.longitude, loc.latitude],
            },
          })),
        };

        // Add the GeoJSON source with clustering enabled
        map.current.addSource("displayedLocation", {
          type: "geojson",
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        // Add layer for clusters
        map.current.addLayer({
          id: "clusters",
          type: "circle",
          source: "displayedLocation",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#F18C18",
              100,
              "#F18C18",
              750,
              "#F18C18",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });

        // Add layer for cluster count labels
        map.current.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "displayedLocation",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        // Add layer for unclustered points
        map.current.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "displayedLocation",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#F18C18",
            "circle-radius": 12,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        // Add custom markers with background images
        displayedLocation.forEach((loc) => {
          const markerElement = document.createElement("div");
          markerElement.className = "marker";
          markerElement.style.backgroundImage = `url(${loc.mainImage})`;
          markerElement.style.width = "50px";
          markerElement.style.height = "50px";
          markerElement.style.backgroundSize = "cover";
          markerElement.style.backgroundPosition = "center";

          markerElement.addEventListener("click", () => {
            navigate(`/${loc.id}`, { state: { link: currentLocation } });
          });

          const marker = new maptilersdk.Marker({ element: markerElement })
            .setLngLat([loc.longitude, loc.latitude])
            .addTo(map.current);

          // Add the marker element to the map only when zoomed in
          map.current.on("zoom", () => {
            if (map.current.getZoom() > 9) {
              marker.getElement().style.display = "block";
            } else {
              marker.getElement().style.display = "none";
            }
          });
        });

        // Add click event for clusters
        map.current.on("click", "clusters", (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map.current
            .getSource("displayedLocation")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });

        map.current.on("click", "unclustered-point", (e) => {
          const { id } = e.features[0].properties;

          // Navigate to the location's detail page
          navigate(`/${id}`, { state: {link: currentLocation}});
        });

        map.current.on("mouseenter", "clusters", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });
        map.current.on("mouseleave", "clusters", () => {
          map.current.getCanvas().style.cursor = "";
        });
      });
    }
  }, [poland.lng, poland.lat, zoom, navigate, displayedLocation]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <Search typeFilter={typeFilter} />
      {/* <ThemeToggle /> */}
    </div>
  );
}
