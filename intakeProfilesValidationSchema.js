import * as Yup from "yup";

const intakeProfilesValidationSchema = Yup.object().shape({
  currentMedication: Yup.string().max(2000, "Maximum 2000 characters"),
  hasSkinRash: Yup.bool().required("Required"),
  hasAcutePain: Yup.bool().required("Required"),
  hasCold: Yup.bool().required("Required"),
  hasInjuries: Yup.bool().required("Required"),
  hasWounds: Yup.bool().required("Required"),
  isContagious: Yup.bool().required("Required"),
  isPregnant: Yup.bool().required("Required"),
  allergyNotes: Yup.string().max(2000, "Maximum 2000 characters"),
  painDiagramId: Yup.number().max(2000, "Maximum 2000 characters"),
  sessionGoals: Yup.string().max(2000, "Maximum 2000 characters"),
  hasAcknowledged: Yup.bool().oneOf([true], "Required").required("Required"),
});

export default intakeProfilesValidationSchema;
