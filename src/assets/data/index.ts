import { IActivityStatus, IMarker, IUser } from "interfaces";

import ActivityStatus from "assets/data/activity_status.json";
import MarkerData from "assets/data/marker.json";
import SavedList from "assets/data/saved_list.json";
import User from "assets/data/user.json";

export const ActivityStatuses = ActivityStatus as IActivityStatus[];
export const Markers = MarkerData as IMarker[];
export const SavedLists = SavedList as unknown as IMarker[];
export const Users = User as unknown as IUser[];