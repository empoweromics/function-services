import { ProjectModel } from "../models/project.model";

export const allPolygonsGeoJsonShaped = () =>
  ProjectModel.find(
    {
      polygonHasNull: false
    },
    {
      projection: {
        _id: 1,
        type: "Feature",
        geometry: "$geoJSON",
        properties: {
          code: "$code",
          name: "$name",
          supplier: "$supplier",
          state: "$state",
          category: "$category",
          description: "$description",
          area: "$area",
          city: "$city",
          country: "$country",
          acres: "$acres",
          rating: "$rating",
          active: "$active"
        }
      }
    }
  );
