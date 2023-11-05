import { AuthService, IAuthService } from "./auth";
import { LeadService, ILeadService } from "./lead";

export interface IProvidedService {
  auth: IAuthService;
  lead: ILeadService;
}

export const initializeService = (): IProvidedService => ({
  auth: new AuthService(),
  lead: new LeadService(),
})