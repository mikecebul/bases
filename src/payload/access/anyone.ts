import { Access, FieldAccess } from "payload";

export const anyone: Access = () => true;

export const fieldLevelAnyone: FieldAccess = () => true;
