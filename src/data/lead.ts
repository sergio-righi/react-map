import { ApiResponse } from "types";
import { IActivityStatus, IMarker, ISavedList } from "interfaces";
import { Enums } from "utils";
import { Auxiliars } from "helpers";
import { ActivityStatuses, Markers, SavedLists } from "assets/data";

export interface ILeadData {
  statuses(): Promise<ApiResponse<IActivityStatus[]>>;
  savedLists(): Promise<ApiResponse<ISavedList[]>>;
  insertSavedList(savedList: ISavedList): Promise<ApiResponse<string>>;
  updateSavedList(id: string, savedList: ISavedList): Promise<ApiResponse<boolean>>;
  deleteSavedList(id: string): Promise<ApiResponse<boolean>>;
  markers(): Promise<ApiResponse<IMarker[]>>;
  findMarker(id: string): Promise<ApiResponse<IMarker>>;
  insertMarker(marker: IMarker): Promise<ApiResponse<string>>;
  updateMarker(id: string, marker: IMarker): Promise<ApiResponse<boolean>>;
  deleteMarker(id: string): Promise<ApiResponse<boolean>>;
}

export class LeadData implements ILeadData {

  async statuses(): Promise<ApiResponse<IActivityStatus[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: ActivityStatuses.filter((status: IActivityStatus) => status.active)
    }));
  }

  async savedLists(): Promise<ApiResponse<ISavedList[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success,
      payload: [] // SavedLists
    }));
  }

  async insertSavedList(savedList: ISavedList): Promise<ApiResponse<string>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success,
      payload: String(Date.now())
    }));
  }

  async updateSavedList(id: string, savedList: ISavedList): Promise<ApiResponse<boolean>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success,
      payload: true
    }));
  }

  async deleteSavedList(id: string): Promise<ApiResponse<boolean>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success,
      payload: true
    }));
  }

  async markers(): Promise<ApiResponse<IMarker[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success,
      payload: [] // Markers
    }));
  }

  async findMarker(id: string): Promise<ApiResponse<IMarker>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Markers[0] //.find((item: IProperty) => item.id === id)
    }));
  }

  async insertMarker(marker: IMarker): Promise<ApiResponse<string>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success,
      payload: String(Date.now())
    }));
  }

  async updateMarker(id: string, marker: IMarker): Promise<ApiResponse<boolean>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success,
      payload: true
    }));
  }

  async deleteMarker(id: string): Promise<ApiResponse<boolean>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success,
      payload: true
    }));
  }
}