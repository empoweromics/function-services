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
          logo: "$logo",
          developer: "$developer",
          name: "$name",
          category: "$category",
          area: "$area"
        }
      }
    }
  );
