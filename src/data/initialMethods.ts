import { ConstructionMethod } from "../types";
import { PHASE_01_METHODS } from "./methods/phase01";
import { PHASE_02_METHODS } from "./methods/phase02";
import { PHASE_03_METHODS } from "./methods/phase03";
import { PHASE_04_METHODS } from "./methods/phase04";
import { PHASE_05_METHODS } from "./methods/phase05";
import { PHASE_06_METHODS } from "./methods/phase06";
import { PHASE_07_METHODS } from "./methods/phase07";
import { PHASE_08_METHODS } from "./methods/phase08";
import { PHASE_09_METHODS } from "./methods/phase09";
import { PHASE_10_METHODS } from "./methods/phase10";
import { PHASE_11_METHODS } from "./methods/phase11";
import { PHASE_12_METHODS } from "./methods/phase12";

export const INITIAL_METHODS: ConstructionMethod[] = [
  ...PHASE_01_METHODS,
  ...PHASE_02_METHODS,
  ...PHASE_03_METHODS,
  ...PHASE_04_METHODS,
  ...PHASE_05_METHODS,
  ...PHASE_06_METHODS,
  ...PHASE_07_METHODS,
  ...PHASE_08_METHODS,
  ...PHASE_09_METHODS,
  ...PHASE_10_METHODS,
  ...PHASE_11_METHODS,
  ...PHASE_12_METHODS,
];
