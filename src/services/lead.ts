import { LeadData, ILeadData } from "data";
import { IActivityStatus, IMarker, ISavedList } from "interfaces";
import { ApiResponse } from "types";

export interface ILeadService {
  statuses(): Promise<IActivityStatus[]>;
  savedLists(): Promise<ISavedList[]>;
  manageSavedList(savedList: ISavedList): Promise<ApiResponse<boolean | string>>;
  updateSavedList(id: string, savedList: ISavedList): Promise<ApiResponse<boolean>>;
  deleteSavedList(id: string): Promise<boolean>;
  markers(): Promise<IMarker[]>;
  findMarker(id: string): Promise<IMarker>;
  insertMarker(marker: IMarker): Promise<ApiResponse<string>>;
  updateMarker(id: string, marker: IMarker): Promise<ApiResponse<boolean>>;
  deleteMarker(id: string): Promise<boolean>;
}

export class LeadService implements ILeadService {
  leadData: ILeadData;

  constructor() {
    this.leadData = new LeadData();
  }

  /**
   * fetch all the possible activity statuses
   * @returns {IActivityStatus[]} a list of activity status
   */

  async statuses() {
    const { payload } = await this.leadData.statuses();
    return payload ?? [];
  }

  /**
   * fetch all the saved lists
   * @returns {ISavedList[]} a list of saved lists
   */

  async savedLists() {
    const { payload } = await this.leadData.savedLists();
    return payload ?? [];
  }

  /**
   * insert or update a saved list
   * @param {ISavedList} savedList the saved list to be inserted or updated
   * @returns {boolean | number} boolean if update is being performed and number if insert is being performed
   */

  async manageSavedList(savedList: ISavedList) {
    return savedList.id ? await this.leadData.updateSavedList(savedList.id, savedList) : await this.leadData.insertSavedList(savedList)
  }

  /**
   * update the saved list information
   * @param {string} id the ID of the saved list
   * @param {ISavedList} savedList the data of the saved list to be updated
   * @returns {boolean} whether the update was successful
   */

  async updateSavedList(id: string, savedList: ISavedList) {
    return await this.leadData.updateSavedList(id, savedList);
  }

  /**
   * delete a given saved list
   * @param {string} id the saved list ID to be deleted 
   * @returns {boolean} whether the delete was successful
   */

  async deleteSavedList(id: string) {
    const { payload } = await this.leadData.deleteSavedList(id);
    return payload ?? false;
  }

  /**
   * fetch all the markers
   */

  async markers() {
    const { payload } = await this.leadData.markers();
    return payload ?? [];
  }

  /**
   * get the marker information
   * @param {string} id the marker ID to be searched
   * @returns {IMarker} the marker object
   */

  async findMarker(id: string) {
    const { payload } = await this.leadData.findMarker(id);
    return payload;
  }

  /**
   * insert the marker
   * @param {IMarker} marker the data of the marker to be inserted
   * @returns {boolean} whether the update was successful
   */

  async insertMarker(marker: IMarker) {
    return await this.leadData.insertMarker(marker);
  }

  /**
   * update the marker information
   * @param {string} id the ID of the marker
   * @param {IMarker} marker the data of the marker to be updated
   * @returns {boolean} whether the update was successful
   */

  async updateMarker(id: string, marker: IMarker) {
    return await this.leadData.updateMarker(id, marker);
  }

  /**
   * delete a given marker
   * @param {string} id the marker ID to be deleted
   * @returns {boolean} whether the delete was successful
   */

  async deleteMarker(id: string) {
    const { payload } = await this.leadData.deleteMarker(id);
    return payload;
  }
}