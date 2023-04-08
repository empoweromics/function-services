import { ProjectModel } from "../models/project.model";

export const allPolygonsGeoJsonShaped = () =>
  ProjectModel.find(
    {
      polygonHasNull: false
    },
    {
      type: "Feature",
      geometry: "$geoJSON",
      properties: {
        id: "$_id",
        logo: "$logo",
        developer: "$developer",
        name: "$name",
        category: "$category",
        area: "$area",
        acres: "$acres",
        units: "$units.totla"
      }
    }
  );
