// FILE HASIL GENERATOR (tools/codegen/generate-routes.mjs) - JANGAN EDIT TANGAN.
// Jalankan ulang generator kalau ada modul baru, jangan sunting file ini langsung.
import { lazy } from 'react'
import type { ReactElement } from 'react'

const List_0 = lazy(() => import('@/features/AuditIncidentReport/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_0 = lazy(() => import('@/features/AuditIncidentReport/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_1 = lazy(() => import('@/features/AuditInfectionSurveillance/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_1 = lazy(() => import('@/features/AuditInfectionSurveillance/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_2 = lazy(() => import('@/features/AuditQualityIndicator/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_2 = lazy(() => import('@/features/AuditQualityIndicator/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_3 = lazy(() => import('@/features/Authorization/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_3 = lazy(() => import('@/features/Authorization/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_4 = lazy(() => import('@/features/BerkasKlaimClaimCompleteness/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_4 = lazy(() => import('@/features/BerkasKlaimClaimCompleteness/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_5 = lazy(() => import('@/features/BerkasKlaimClaimCompletenessComment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_5 = lazy(() => import('@/features/BerkasKlaimClaimCompletenessComment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_6 = lazy(() => import('@/features/BerkasKlaimClaimFile/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_6 = lazy(() => import('@/features/BerkasKlaimClaimFile/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_7 = lazy(() => import('@/features/BerkasKlaimClinicalLabClaim/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_7 = lazy(() => import('@/features/BerkasKlaimClinicalLabClaim/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_8 = lazy(() => import('@/features/BerkasKlaimClinicalLabClaimItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_8 = lazy(() => import('@/features/BerkasKlaimClinicalLabClaimItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_9 = lazy(() => import('@/features/BerkasKlaimPathologyClaim/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_9 = lazy(() => import('@/features/BerkasKlaimPathologyClaim/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_10 = lazy(() => import('@/features/BerkasKlaimPathologyClaimItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_10 = lazy(() => import('@/features/BerkasKlaimPathologyClaimItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_11 = lazy(() => import('@/features/BerkasKlaimPharmacyClaim/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_11 = lazy(() => import('@/features/BerkasKlaimPharmacyClaim/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_12 = lazy(() => import('@/features/BerkasKlaimPharmacyClaimItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_12 = lazy(() => import('@/features/BerkasKlaimPharmacyClaimItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_13 = lazy(() => import('@/features/BerkasKlaimRadiologyClaim/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_13 = lazy(() => import('@/features/BerkasKlaimRadiologyClaim/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_14 = lazy(() => import('@/features/BerkasKlaimRadiologyClaimItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_14 = lazy(() => import('@/features/BerkasKlaimRadiologyClaimItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_15 = lazy(() => import('@/features/BerkasKlaimSupportingDocument/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_15 = lazy(() => import('@/features/BerkasKlaimSupportingDocument/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_16 = lazy(() => import('@/features/GeneralAbsenceType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_16 = lazy(() => import('@/features/GeneralAbsenceType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_17 = lazy(() => import('@/features/GeneralAccidentGuarantorType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_17 = lazy(() => import('@/features/GeneralAccidentGuarantorType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_18 = lazy(() => import('@/features/GeneralAccommodationCalculationRule/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_18 = lazy(() => import('@/features/GeneralAccommodationCalculationRule/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_19 = lazy(() => import('@/features/GeneralActiveIngredient/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_19 = lazy(() => import('@/features/GeneralActiveIngredient/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_20 = lazy(() => import('@/features/GeneralAdministration/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_20 = lazy(() => import('@/features/GeneralAdministration/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_21 = lazy(() => import('@/features/GeneralAdministrationTariff/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_21 = lazy(() => import('@/features/GeneralAdministrationTariff/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_22 = lazy(() => import('@/features/GeneralAdmissionDiagnosis/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_22 = lazy(() => import('@/features/GeneralAdmissionDiagnosis/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_23 = lazy(() => import('@/features/GeneralAgeGroup/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_23 = lazy(() => import('@/features/GeneralAgeGroup/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_24 = lazy(() => import('@/features/GeneralAmbulanceFleet/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_24 = lazy(() => import('@/features/GeneralAmbulanceFleet/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_25 = lazy(() => import('@/features/GeneralAnatomyTemplate/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_25 = lazy(() => import('@/features/GeneralAnatomyTemplate/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_26 = lazy(() => import('@/features/GeneralAnesthesiaType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_26 = lazy(() => import('@/features/GeneralAnesthesiaType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_27 = lazy(() => import('@/features/GeneralAntibioticBacteriaMapping/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_27 = lazy(() => import('@/features/GeneralAntibioticBacteriaMapping/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_28 = lazy(() => import('@/features/GeneralAntibioticRestriction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_28 = lazy(() => import('@/features/GeneralAntibioticRestriction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_29 = lazy(() => import('@/features/GeneralAudioAttachment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_29 = lazy(() => import('@/features/GeneralAudioAttachment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_30 = lazy(() => import('@/features/GeneralBank/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_30 = lazy(() => import('@/features/GeneralBank/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_31 = lazy(() => import('@/features/GeneralBankAccount/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_31 = lazy(() => import('@/features/GeneralBankAccount/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_32 = lazy(() => import('@/features/GeneralBed/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_32 = lazy(() => import('@/features/GeneralBed/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_33 = lazy(() => import('@/features/GeneralBedStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_33 = lazy(() => import('@/features/GeneralBedStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_34 = lazy(() => import('@/features/GeneralBirthplace/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_34 = lazy(() => import('@/features/GeneralBirthplace/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_35 = lazy(() => import('@/features/GeneralBridgeType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_35 = lazy(() => import('@/features/GeneralBridgeType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_36 = lazy(() => import('@/features/GeneralCardType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_36 = lazy(() => import('@/features/GeneralCardType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_37 = lazy(() => import('@/features/GeneralConsultationRoom/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_37 = lazy(() => import('@/features/GeneralConsultationRoom/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_38 = lazy(() => import('@/features/GeneralContactType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_38 = lazy(() => import('@/features/GeneralContactType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_39 = lazy(() => import('@/features/GeneralCountry/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_39 = lazy(() => import('@/features/GeneralCountry/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_40 = lazy(() => import('@/features/GeneralDepositType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_40 = lazy(() => import('@/features/GeneralDepositType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_41 = lazy(() => import('@/features/GeneralDiagnosisCode/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_41 = lazy(() => import('@/features/GeneralDiagnosisCode/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_42 = lazy(() => import('@/features/GeneralDiagnosisRestriction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_42 = lazy(() => import('@/features/GeneralDiagnosisRestriction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_43 = lazy(() => import('@/features/GeneralDischargeCondition/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_43 = lazy(() => import('@/features/GeneralDischargeCondition/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_44 = lazy(() => import('@/features/GeneralDiscountType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_44 = lazy(() => import('@/features/GeneralDiscountType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_45 = lazy(() => import('@/features/GeneralDoctor/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_45 = lazy(() => import('@/features/GeneralDoctor/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_46 = lazy(() => import('@/features/GeneralDoctorMedicalDepartment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_46 = lazy(() => import('@/features/GeneralDoctorMedicalDepartment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_47 = lazy(() => import('@/features/GeneralDoctorWardAssignment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_47 = lazy(() => import('@/features/GeneralDoctorWardAssignment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_48 = lazy(() => import('@/features/GeneralDosageInstruction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_48 = lazy(() => import('@/features/GeneralDosageInstruction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_49 = lazy(() => import('@/features/GeneralDurationRestriction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_49 = lazy(() => import('@/features/GeneralDurationRestriction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_50 = lazy(() => import('@/features/GeneralEducation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_50 = lazy(() => import('@/features/GeneralEducation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_51 = lazy(() => import('@/features/GeneralEmployee/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_51 = lazy(() => import('@/features/GeneralEmployee/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_52 = lazy(() => import('@/features/GeneralEmployeePhoto/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_52 = lazy(() => import('@/features/GeneralEmployeePhoto/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_53 = lazy(() => import('@/features/GeneralEmployeeStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_53 = lazy(() => import('@/features/GeneralEmployeeStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_54 = lazy(() => import('@/features/GeneralEmploymentStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_54 = lazy(() => import('@/features/GeneralEmploymentStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_55 = lazy(() => import('@/features/GeneralEthnicity/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_55 = lazy(() => import('@/features/GeneralEthnicity/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_56 = lazy(() => import('@/features/GeneralExaminationGroup/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_56 = lazy(() => import('@/features/GeneralExaminationGroup/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_57 = lazy(() => import('@/features/GeneralExaminationGroupMapping/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_57 = lazy(() => import('@/features/GeneralExaminationGroupMapping/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_58 = lazy(() => import('@/features/GeneralFacilityMaintenance/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_58 = lazy(() => import('@/features/GeneralFacilityMaintenance/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_59 = lazy(() => import('@/features/GeneralFacilityOwnershipType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_59 = lazy(() => import('@/features/GeneralFacilityOwnershipType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_60 = lazy(() => import('@/features/GeneralFamilyRelationship/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_60 = lazy(() => import('@/features/GeneralFamilyRelationship/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_61 = lazy(() => import('@/features/GeneralFlow/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_61 = lazy(() => import('@/features/GeneralFlow/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_62 = lazy(() => import('@/features/GeneralFormularyRestriction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_62 = lazy(() => import('@/features/GeneralFormularyRestriction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_63 = lazy(() => import('@/features/GeneralGender/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_63 = lazy(() => import('@/features/GeneralGender/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_64 = lazy(() => import('@/features/GeneralGoodsReceiptCancellationReason/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_64 = lazy(() => import('@/features/GeneralGoodsReceiptCancellationReason/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_65 = lazy(() => import('@/features/GeneralGoodsReceiptType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_65 = lazy(() => import('@/features/GeneralGoodsReceiptType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_66 = lazy(() => import('@/features/GeneralGuarantorItemCategoryMapping/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_66 = lazy(() => import('@/features/GeneralGuarantorItemCategoryMapping/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_67 = lazy(() => import('@/features/GeneralGuarantorParticipantType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_67 = lazy(() => import('@/features/GeneralGuarantorParticipantType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_68 = lazy(() => import('@/features/GeneralGuarantorSubspecialty/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_68 = lazy(() => import('@/features/GeneralGuarantorSubspecialty/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_69 = lazy(() => import('@/features/GeneralGuarantorWardAccess/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_69 = lazy(() => import('@/features/GeneralGuarantorWardAccess/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_70 = lazy(() => import('@/features/GeneralHealthProviderType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_70 = lazy(() => import('@/features/GeneralHealthProviderType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_71 = lazy(() => import('@/features/GeneralHealthcareServiceType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_71 = lazy(() => import('@/features/GeneralHealthcareServiceType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_72 = lazy(() => import('@/features/GeneralIcdOMorphology/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_72 = lazy(() => import('@/features/GeneralIcdOMorphology/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_73 = lazy(() => import('@/features/GeneralIcdOTopography/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_73 = lazy(() => import('@/features/GeneralIcdOTopography/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_74 = lazy(() => import('@/features/GeneralIcdSnomedCtMapping/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_74 = lazy(() => import('@/features/GeneralIcdSnomedCtMapping/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_75 = lazy(() => import('@/features/GeneralIcdType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_75 = lazy(() => import('@/features/GeneralIcdType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_76 = lazy(() => import('@/features/GeneralIdentityCardType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_76 = lazy(() => import('@/features/GeneralIdentityCardType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_77 = lazy(() => import('@/features/GeneralInpatientType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_77 = lazy(() => import('@/features/GeneralInpatientType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_78 = lazy(() => import('@/features/GeneralInstitution/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_78 = lazy(() => import('@/features/GeneralInstitution/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_79 = lazy(() => import('@/features/GeneralInsuranceCardType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_79 = lazy(() => import('@/features/GeneralInsuranceCardType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_80 = lazy(() => import('@/features/GeneralInvoiceType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_80 = lazy(() => import('@/features/GeneralInvoiceType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_81 = lazy(() => import('@/features/GeneralKap/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_81 = lazy(() => import('@/features/GeneralKap/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_82 = lazy(() => import('@/features/GeneralKip/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_82 = lazy(() => import('@/features/GeneralKip/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_83 = lazy(() => import('@/features/GeneralLabGroup/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_83 = lazy(() => import('@/features/GeneralLabGroup/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_84 = lazy(() => import('@/features/GeneralLabReferenceValue/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_84 = lazy(() => import('@/features/GeneralLabReferenceValue/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_85 = lazy(() => import('@/features/GeneralLabServiceGroup/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_85 = lazy(() => import('@/features/GeneralLabServiceGroup/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_86 = lazy(() => import('@/features/GeneralLabServiceParameter/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_86 = lazy(() => import('@/features/GeneralLabServiceParameter/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_87 = lazy(() => import('@/features/GeneralLaboratoryRoom/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_87 = lazy(() => import('@/features/GeneralLaboratoryRoom/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_88 = lazy(() => import('@/features/GeneralLaboratoryUnit/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_88 = lazy(() => import('@/features/GeneralLaboratoryUnit/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_89 = lazy(() => import('@/features/GeneralLanguage/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_89 = lazy(() => import('@/features/GeneralLanguage/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_90 = lazy(() => import('@/features/GeneralManufacturer/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_90 = lazy(() => import('@/features/GeneralManufacturer/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_91 = lazy(() => import('@/features/GeneralMaritalStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_91 = lazy(() => import('@/features/GeneralMaritalStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_92 = lazy(() => import('@/features/GeneralMedicalDepartment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_92 = lazy(() => import('@/features/GeneralMedicalDepartment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_93 = lazy(() => import('@/features/GeneralMedicalDepartmentWardAssignment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_93 = lazy(() => import('@/features/GeneralMedicalDepartmentWardAssignment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_94 = lazy(() => import('@/features/GeneralMedicalPersonnel/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_94 = lazy(() => import('@/features/GeneralMedicalPersonnel/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_95 = lazy(() => import('@/features/GeneralMedicalPersonnelType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_95 = lazy(() => import('@/features/GeneralMedicalPersonnelType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_96 = lazy(() => import('@/features/GeneralMedicationAdministrationType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_96 = lazy(() => import('@/features/GeneralMedicationAdministrationType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_97 = lazy(() => import('@/features/GeneralMedicationUsageType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_97 = lazy(() => import('@/features/GeneralMedicationUsageType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_98 = lazy(() => import('@/features/GeneralMixtureInstruction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_98 = lazy(() => import('@/features/GeneralMixtureInstruction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_99 = lazy(() => import('@/features/GeneralMixturePackagingType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_99 = lazy(() => import('@/features/GeneralMixturePackagingType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_100 = lazy(() => import('@/features/GeneralMixtureType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_100 = lazy(() => import('@/features/GeneralMixtureType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_101 = lazy(() => import('@/features/GeneralMonthName/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_101 = lazy(() => import('@/features/GeneralMonthName/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_102 = lazy(() => import('@/features/GeneralNurse/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_102 = lazy(() => import('@/features/GeneralNurse/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_103 = lazy(() => import('@/features/GeneralNurseWardAssignment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_103 = lazy(() => import('@/features/GeneralNurseWardAssignment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_104 = lazy(() => import('@/features/GeneralOccupation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_104 = lazy(() => import('@/features/GeneralOccupation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_105 = lazy(() => import('@/features/GeneralOperatingRoom/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_105 = lazy(() => import('@/features/GeneralOperatingRoom/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_106 = lazy(() => import('@/features/GeneralOperationClass/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_106 = lazy(() => import('@/features/GeneralOperationClass/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_107 = lazy(() => import('@/features/GeneralOperationGroup/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_107 = lazy(() => import('@/features/GeneralOperationGroup/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_108 = lazy(() => import('@/features/GeneralOperationType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_108 = lazy(() => import('@/features/GeneralOperationType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_109 = lazy(() => import('@/features/GeneralOtherService/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_109 = lazy(() => import('@/features/GeneralOtherService/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_110 = lazy(() => import('@/features/GeneralOtherServiceTariff/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_110 = lazy(() => import('@/features/GeneralOtherServiceTariff/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_111 = lazy(() => import('@/features/GeneralOtherStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_111 = lazy(() => import('@/features/GeneralOtherStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_112 = lazy(() => import('@/features/GeneralOxygenTariff/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_112 = lazy(() => import('@/features/GeneralOxygenTariff/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_113 = lazy(() => import('@/features/GeneralPackage/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_113 = lazy(() => import('@/features/GeneralPackage/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_114 = lazy(() => import('@/features/GeneralPackageItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_114 = lazy(() => import('@/features/GeneralPackageItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_115 = lazy(() => import('@/features/GeneralPackageItemType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_115 = lazy(() => import('@/features/GeneralPackageItemType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_116 = lazy(() => import('@/features/GeneralPackageService/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_116 = lazy(() => import('@/features/GeneralPackageService/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_117 = lazy(() => import('@/features/GeneralPackageTariffDistribution/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_117 = lazy(() => import('@/features/GeneralPackageTariffDistribution/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_118 = lazy(() => import('@/features/GeneralPackageTariffDistributionItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_118 = lazy(() => import('@/features/GeneralPackageTariffDistributionItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_119 = lazy(() => import('@/features/GeneralPainOnsetType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_119 = lazy(() => import('@/features/GeneralPainOnsetType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_120 = lazy(() => import('@/features/GeneralPainScaleMethod/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_120 = lazy(() => import('@/features/GeneralPainScaleMethod/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_121 = lazy(() => import('@/features/GeneralPathologyExaminationType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_121 = lazy(() => import('@/features/GeneralPathologyExaminationType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_122 = lazy(() => import('@/features/GeneralPatient/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_122 = lazy(() => import('@/features/GeneralPatient/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_123 = lazy(() => import('@/features/GeneralPatientAccessLock/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_123 = lazy(() => import('@/features/GeneralPatientAccessLock/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_124 = lazy(() => import('@/features/GeneralPatientContact/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_124 = lazy(() => import('@/features/GeneralPatientContact/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_125 = lazy(() => import('@/features/GeneralPatientFamily/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_125 = lazy(() => import('@/features/GeneralPatientFamily/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_126 = lazy(() => import('@/features/GeneralPatientFamilyContact/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_126 = lazy(() => import('@/features/GeneralPatientFamilyContact/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_127 = lazy(() => import('@/features/GeneralPatientFamilyIdentityCard/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_127 = lazy(() => import('@/features/GeneralPatientFamilyIdentityCard/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_128 = lazy(() => import('@/features/GeneralPatientPhoto/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_128 = lazy(() => import('@/features/GeneralPatientPhoto/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_129 = lazy(() => import('@/features/GeneralPatientPickupStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_129 = lazy(() => import('@/features/GeneralPatientPickupStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_130 = lazy(() => import('@/features/GeneralPatientStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_130 = lazy(() => import('@/features/GeneralPatientStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_131 = lazy(() => import('@/features/GeneralPatientType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_131 = lazy(() => import('@/features/GeneralPatientType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_132 = lazy(() => import('@/features/GeneralPaymentTransactionType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_132 = lazy(() => import('@/features/GeneralPaymentTransactionType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_133 = lazy(() => import('@/features/GeneralPaymentType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_133 = lazy(() => import('@/features/GeneralPaymentType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_134 = lazy(() => import('@/features/GeneralPayrollAddition/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_134 = lazy(() => import('@/features/GeneralPayrollAddition/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_135 = lazy(() => import('@/features/GeneralPayrollDeduction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_135 = lazy(() => import('@/features/GeneralPayrollDeduction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_136 = lazy(() => import('@/features/GeneralPharmacyDepot/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_136 = lazy(() => import('@/features/GeneralPharmacyDepot/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_137 = lazy(() => import('@/features/GeneralPharmacyGuarantorMargin/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_137 = lazy(() => import('@/features/GeneralPharmacyGuarantorMargin/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_138 = lazy(() => import('@/features/GeneralPharmacyRoom/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_138 = lazy(() => import('@/features/GeneralPharmacyRoom/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_139 = lazy(() => import('@/features/GeneralPharmacyServiceRoom/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_139 = lazy(() => import('@/features/GeneralPharmacyServiceRoom/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_140 = lazy(() => import('@/features/GeneralPharmacyStatusType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_140 = lazy(() => import('@/features/GeneralPharmacyStatusType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_141 = lazy(() => import('@/features/GeneralPharmacyTariffByRoomClass/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_141 = lazy(() => import('@/features/GeneralPharmacyTariffByRoomClass/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_142 = lazy(() => import('@/features/GeneralPhysicianRestriction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_142 = lazy(() => import('@/features/GeneralPhysicianRestriction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_143 = lazy(() => import('@/features/GeneralPlanningPeriod/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_143 = lazy(() => import('@/features/GeneralPlanningPeriod/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_144 = lazy(() => import('@/features/GeneralPositionTitle/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_144 = lazy(() => import('@/features/GeneralPositionTitle/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_145 = lazy(() => import('@/features/GeneralPpk/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_145 = lazy(() => import('@/features/GeneralPpk/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_146 = lazy(() => import('@/features/GeneralPrescriptionFrequencyRule/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_146 = lazy(() => import('@/features/GeneralPrescriptionFrequencyRule/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_147 = lazy(() => import('@/features/GeneralPrescriptionFrequencyRuleCategory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_147 = lazy(() => import('@/features/GeneralPrescriptionFrequencyRuleCategory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_148 = lazy(() => import('@/features/GeneralPrescriptionOriginUnitRestriction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_148 = lazy(() => import('@/features/GeneralPrescriptionOriginUnitRestriction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_149 = lazy(() => import('@/features/GeneralPrescriptionType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_149 = lazy(() => import('@/features/GeneralPrescriptionType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_150 = lazy(() => import('@/features/GeneralPrintType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_150 = lazy(() => import('@/features/GeneralPrintType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_151 = lazy(() => import('@/features/GeneralProcedure/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_151 = lazy(() => import('@/features/GeneralProcedure/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_152 = lazy(() => import('@/features/GeneralProfession/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_152 = lazy(() => import('@/features/GeneralProfession/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_153 = lazy(() => import('@/features/GeneralQuantityRestriction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_153 = lazy(() => import('@/features/GeneralQuantityRestriction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_154 = lazy(() => import('@/features/GeneralQuarter/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_154 = lazy(() => import('@/features/GeneralQuarter/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_155 = lazy(() => import('@/features/GeneralRadiologyRoom/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_155 = lazy(() => import('@/features/GeneralRadiologyRoom/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_156 = lazy(() => import('@/features/GeneralReferralCode/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_156 = lazy(() => import('@/features/GeneralReferralCode/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_157 = lazy(() => import('@/features/GeneralReferralRoom/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_157 = lazy(() => import('@/features/GeneralReferralRoom/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_158 = lazy(() => import('@/features/GeneralReferralStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_158 = lazy(() => import('@/features/GeneralReferralStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_159 = lazy(() => import('@/features/GeneralReferralType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_159 = lazy(() => import('@/features/GeneralReferralType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_160 = lazy(() => import('@/features/GeneralRegionType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_160 = lazy(() => import('@/features/GeneralRegionType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_161 = lazy(() => import('@/features/GeneralReligion/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_161 = lazy(() => import('@/features/GeneralReligion/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_162 = lazy(() => import('@/features/GeneralReportType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_162 = lazy(() => import('@/features/GeneralReportType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_163 = lazy(() => import('@/features/GeneralReportTypeItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_163 = lazy(() => import('@/features/GeneralReportTypeItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_164 = lazy(() => import('@/features/GeneralReservationStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_164 = lazy(() => import('@/features/GeneralReservationStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_165 = lazy(() => import('@/features/GeneralReturnCancellationReason/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_165 = lazy(() => import('@/features/GeneralReturnCancellationReason/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_166 = lazy(() => import('@/features/GeneralReturnCancellationType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_166 = lazy(() => import('@/features/GeneralReturnCancellationType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_167 = lazy(() => import('@/features/GeneralRoom/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_167 = lazy(() => import('@/features/GeneralRoom/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_168 = lazy(() => import('@/features/GeneralRoomClass/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_168 = lazy(() => import('@/features/GeneralRoomClass/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_169 = lazy(() => import('@/features/GeneralRoomClassReferenceGroup/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_169 = lazy(() => import('@/features/GeneralRoomClassReferenceGroup/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_170 = lazy(() => import('@/features/GeneralSalesTax/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_170 = lazy(() => import('@/features/GeneralSalesTax/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_171 = lazy(() => import('@/features/GeneralScannedDocument/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_171 = lazy(() => import('@/features/GeneralScannedDocument/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_172 = lazy(() => import('@/features/GeneralService/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_172 = lazy(() => import('@/features/GeneralService/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_173 = lazy(() => import('@/features/GeneralServiceTariff/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_173 = lazy(() => import('@/features/GeneralServiceTariff/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_174 = lazy(() => import('@/features/GeneralServiceTariffDistribution/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_174 = lazy(() => import('@/features/GeneralServiceTariffDistribution/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_175 = lazy(() => import('@/features/GeneralServiceType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_175 = lazy(() => import('@/features/GeneralServiceType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_176 = lazy(() => import('@/features/GeneralSitbAnatomyClassification/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_176 = lazy(() => import('@/features/GeneralSitbAnatomyClassification/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_177 = lazy(() => import('@/features/GeneralSitbArt/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_177 = lazy(() => import('@/features/GeneralSitbArt/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_178 = lazy(() => import('@/features/GeneralSitbChestXrayResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_178 = lazy(() => import('@/features/GeneralSitbChestXrayResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_179 = lazy(() => import('@/features/GeneralSitbChildTbScore0To13/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_179 = lazy(() => import('@/features/GeneralSitbChildTbScore0To13/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_180 = lazy(() => import('@/features/GeneralSitbChildTbScore5/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_180 = lazy(() => import('@/features/GeneralSitbChildTbScore5/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_181 = lazy(() => import('@/features/GeneralSitbChildTbScore6/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_181 = lazy(() => import('@/features/GeneralSitbChildTbScore6/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_182 = lazy(() => import('@/features/GeneralSitbDiagnosisType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_182 = lazy(() => import('@/features/GeneralSitbDiagnosisType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_183 = lazy(() => import('@/features/GeneralSitbDm/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_183 = lazy(() => import('@/features/GeneralSitbDm/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_184 = lazy(() => import('@/features/GeneralSitbDmTherapy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_184 = lazy(() => import('@/features/GeneralSitbDmTherapy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_185 = lazy(() => import('@/features/GeneralSitbDrugSource/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_185 = lazy(() => import('@/features/GeneralSitbDrugSource/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_186 = lazy(() => import('@/features/GeneralSitbEndMicroscopy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_186 = lazy(() => import('@/features/GeneralSitbEndMicroscopy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_187 = lazy(() => import('@/features/GeneralSitbHivStatusClassification/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_187 = lazy(() => import('@/features/GeneralSitbHivStatusClassification/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_188 = lazy(() => import('@/features/GeneralSitbHivTestResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_188 = lazy(() => import('@/features/GeneralSitbHivTestResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_189 = lazy(() => import('@/features/GeneralSitbMonth2Microscopy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_189 = lazy(() => import('@/features/GeneralSitbMonth2Microscopy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_190 = lazy(() => import('@/features/GeneralSitbMonth3Microscopy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_190 = lazy(() => import('@/features/GeneralSitbMonth3Microscopy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_191 = lazy(() => import('@/features/GeneralSitbMonth5Microscopy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_191 = lazy(() => import('@/features/GeneralSitbMonth5Microscopy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_192 = lazy(() => import('@/features/GeneralSitbOatGuideline/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_192 = lazy(() => import('@/features/GeneralSitbOatGuideline/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_193 = lazy(() => import('@/features/GeneralSitbPpk/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_193 = lazy(() => import('@/features/GeneralSitbPpk/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_194 = lazy(() => import('@/features/GeneralSitbPreCulture/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_194 = lazy(() => import('@/features/GeneralSitbPreCulture/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_195 = lazy(() => import('@/features/GeneralSitbPreMicroscopy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_195 = lazy(() => import('@/features/GeneralSitbPreMicroscopy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_196 = lazy(() => import('@/features/GeneralSitbPreTcm/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_196 = lazy(() => import('@/features/GeneralSitbPreTcm/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_197 = lazy(() => import('@/features/GeneralSitbReferrerType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_197 = lazy(() => import('@/features/GeneralSitbReferrerType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_198 = lazy(() => import('@/features/GeneralSitbTb03RoTransfer/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_198 = lazy(() => import('@/features/GeneralSitbTb03RoTransfer/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_199 = lazy(() => import('@/features/GeneralSitbThoraxNotDone/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_199 = lazy(() => import('@/features/GeneralSitbThoraxNotDone/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_200 = lazy(() => import('@/features/GeneralSitbTreatmentHistoryClassification/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_200 = lazy(() => import('@/features/GeneralSitbTreatmentHistoryClassification/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_201 = lazy(() => import('@/features/GeneralSitbTreatmentOutcome/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_201 = lazy(() => import('@/features/GeneralSitbTreatmentOutcome/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_202 = lazy(() => import('@/features/GeneralSitbTreatmentStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_202 = lazy(() => import('@/features/GeneralSitbTreatmentStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_203 = lazy(() => import('@/features/GeneralStaffMember/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_203 = lazy(() => import('@/features/GeneralStaffMember/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_204 = lazy(() => import('@/features/GeneralStaffWardAssignment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_204 = lazy(() => import('@/features/GeneralStaffWardAssignment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_205 = lazy(() => import('@/features/GeneralTariffType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_205 = lazy(() => import('@/features/GeneralTariffType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_206 = lazy(() => import('@/features/GeneralTbPatientCategory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_206 = lazy(() => import('@/features/GeneralTbPatientCategory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_207 = lazy(() => import('@/features/GeneralTreatmentCategory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_207 = lazy(() => import('@/features/GeneralTreatmentCategory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_208 = lazy(() => import('@/features/GeneralUserGroup/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_208 = lazy(() => import('@/features/GeneralUserGroup/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_209 = lazy(() => import('@/features/GeneralUserType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_209 = lazy(() => import('@/features/GeneralUserType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_210 = lazy(() => import('@/features/GeneralVideoAttachment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_210 = lazy(() => import('@/features/GeneralVideoAttachment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_211 = lazy(() => import('@/features/GeneralVisitActivityStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_211 = lazy(() => import('@/features/GeneralVisitActivityStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_212 = lazy(() => import('@/features/GeneralVisitCancellationReason/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_212 = lazy(() => import('@/features/GeneralVisitCancellationReason/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_213 = lazy(() => import('@/features/GeneralVisitStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_213 = lazy(() => import('@/features/GeneralVisitStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_214 = lazy(() => import('@/features/GeneralVisitType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_214 = lazy(() => import('@/features/GeneralVisitType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_215 = lazy(() => import('@/features/GeneralWard/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_215 = lazy(() => import('@/features/GeneralWard/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_216 = lazy(() => import('@/features/GeneralWardClassAssignment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_216 = lazy(() => import('@/features/GeneralWardClassAssignment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_217 = lazy(() => import('@/features/GeneralWardService/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_217 = lazy(() => import('@/features/GeneralWardService/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_218 = lazy(() => import('@/features/GeneralWardTariff/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_218 = lazy(() => import('@/features/GeneralWardTariff/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_219 = lazy(() => import('@/features/GeneralWardTransferRoute/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_219 = lazy(() => import('@/features/GeneralWardTransferRoute/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_220 = lazy(() => import('@/features/GeneralWardType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_220 = lazy(() => import('@/features/GeneralWardType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_221 = lazy(() => import('@/features/GeneralWardVisitType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_221 = lazy(() => import('@/features/GeneralWardVisitType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_222 = lazy(() => import('@/features/GeneralYesNoOption/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_222 = lazy(() => import('@/features/GeneralYesNoOption/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_223 = lazy(() => import('@/features/InventoryBloodBag/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_223 = lazy(() => import('@/features/InventoryBloodBag/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_224 = lazy(() => import('@/features/InventoryDietOrder/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_224 = lazy(() => import('@/features/InventoryDietOrder/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_225 = lazy(() => import('@/features/InventoryGoodsReceipt/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_225 = lazy(() => import('@/features/InventoryGoodsReceipt/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_226 = lazy(() => import('@/features/InventoryGoodsReceiptCancellation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_226 = lazy(() => import('@/features/InventoryGoodsReceiptCancellation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_227 = lazy(() => import('@/features/InventoryGoodsReturn/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_227 = lazy(() => import('@/features/InventoryGoodsReturn/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_228 = lazy(() => import('@/features/InventoryGoodsReturnItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_228 = lazy(() => import('@/features/InventoryGoodsReturnItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_229 = lazy(() => import('@/features/InventoryItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_229 = lazy(() => import('@/features/InventoryItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_230 = lazy(() => import('@/features/InventoryItemCategory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_230 = lazy(() => import('@/features/InventoryItemCategory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_231 = lazy(() => import('@/features/InventoryItemClassification/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_231 = lazy(() => import('@/features/InventoryItemClassification/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_232 = lazy(() => import('@/features/InventoryItemPrice/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_232 = lazy(() => import('@/features/InventoryItemPrice/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_233 = lazy(() => import('@/features/InventoryItemSerialNumber/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_233 = lazy(() => import('@/features/InventoryItemSerialNumber/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_234 = lazy(() => import('@/features/InventoryLinenTracking/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_234 = lazy(() => import('@/features/InventoryLinenTracking/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_235 = lazy(() => import('@/features/InventoryMinimumStockLevel/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_235 = lazy(() => import('@/features/InventoryMinimumStockLevel/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_236 = lazy(() => import('@/features/InventoryPharmacyPackage/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_236 = lazy(() => import('@/features/InventoryPharmacyPackage/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_237 = lazy(() => import('@/features/InventoryReceivingItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_237 = lazy(() => import('@/features/InventoryReceivingItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_238 = lazy(() => import('@/features/InventoryReceivingRecord/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_238 = lazy(() => import('@/features/InventoryReceivingRecord/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_239 = lazy(() => import('@/features/InventoryShipment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_239 = lazy(() => import('@/features/InventoryShipment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_240 = lazy(() => import('@/features/InventoryShipmentItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_240 = lazy(() => import('@/features/InventoryShipmentItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_241 = lazy(() => import('@/features/InventorySterilizationCycle/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_241 = lazy(() => import('@/features/InventorySterilizationCycle/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_242 = lazy(() => import('@/features/InventoryStockOpname/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_242 = lazy(() => import('@/features/InventoryStockOpname/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_243 = lazy(() => import('@/features/InventoryStockOpnameItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_243 = lazy(() => import('@/features/InventoryStockOpnameItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_244 = lazy(() => import('@/features/InventoryStockRequest/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_244 = lazy(() => import('@/features/InventoryStockRequest/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_245 = lazy(() => import('@/features/InventoryStockRequestItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_245 = lazy(() => import('@/features/InventoryStockRequestItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_246 = lazy(() => import('@/features/InventorySupplier/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_246 = lazy(() => import('@/features/InventorySupplier/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_247 = lazy(() => import('@/features/InventoryUnitOfMeasure/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_247 = lazy(() => import('@/features/InventoryUnitOfMeasure/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_248 = lazy(() => import('@/features/InventoryWardItemStock/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_248 = lazy(() => import('@/features/InventoryWardItemStock/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_249 = lazy(() => import('@/features/InventoryWardStockTransaction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_249 = lazy(() => import('@/features/InventoryWardStockTransaction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_250 = lazy(() => import('@/features/KemkesBloodType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_250 = lazy(() => import('@/features/KemkesBloodType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_251 = lazy(() => import('@/features/LayananAntimicrobialStewardshipApproval/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_251 = lazy(() => import('@/features/LayananAntimicrobialStewardshipApproval/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_252 = lazy(() => import('@/features/LayananAntimicrobialStewardshipForm/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_252 = lazy(() => import('@/features/LayananAntimicrobialStewardshipForm/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_253 = lazy(() => import('@/features/LayananAntimicrobialStewardshipFormItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_253 = lazy(() => import('@/features/LayananAntimicrobialStewardshipFormItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_254 = lazy(() => import('@/features/LayananAntimicrobialStewardshipGeneralExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_254 = lazy(() => import('@/features/LayananAntimicrobialStewardshipGeneralExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_255 = lazy(() => import('@/features/LayananAntimicrobialStewardshipLabResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_255 = lazy(() => import('@/features/LayananAntimicrobialStewardshipLabResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_256 = lazy(() => import('@/features/LayananAntimicrobialStewardshipMicrobiologyResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_256 = lazy(() => import('@/features/LayananAntimicrobialStewardshipMicrobiologyResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_257 = lazy(() => import('@/features/LayananAntimicrobialStewardshipOtherSupportResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_257 = lazy(() => import('@/features/LayananAntimicrobialStewardshipOtherSupportResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_258 = lazy(() => import('@/features/LayananAntimicrobialStewardshipPriorHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_258 = lazy(() => import('@/features/LayananAntimicrobialStewardshipPriorHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_259 = lazy(() => import('@/features/LayananAntimicrobialStewardshipRadiologyResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_259 = lazy(() => import('@/features/LayananAntimicrobialStewardshipRadiologyResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_260 = lazy(() => import('@/features/LayananBirthRecord/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_260 = lazy(() => import('@/features/LayananBirthRecord/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_261 = lazy(() => import('@/features/LayananBloodRequestItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_261 = lazy(() => import('@/features/LayananBloodRequestItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_262 = lazy(() => import('@/features/LayananCriticalLabValue/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_262 = lazy(() => import('@/features/LayananCriticalLabValue/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_263 = lazy(() => import('@/features/LayananDrugInteractionCheck/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_263 = lazy(() => import('@/features/LayananDrugInteractionCheck/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_264 = lazy(() => import('@/features/LayananEarlyWarningScore/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_264 = lazy(() => import('@/features/LayananEarlyWarningScore/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_265 = lazy(() => import('@/features/LayananExaminationResultStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_265 = lazy(() => import('@/features/LayananExaminationResultStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_266 = lazy(() => import('@/features/LayananImagingOrder/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_266 = lazy(() => import('@/features/LayananImagingOrder/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_267 = lazy(() => import('@/features/LayananLabAnalyzerOrder/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_267 = lazy(() => import('@/features/LayananLabAnalyzerOrder/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_268 = lazy(() => import('@/features/LayananLabCultureResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_268 = lazy(() => import('@/features/LayananLabCultureResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_269 = lazy(() => import('@/features/LayananLabExaminationResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_269 = lazy(() => import('@/features/LayananLabExaminationResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_270 = lazy(() => import('@/features/LayananLabMicroscopicResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_270 = lazy(() => import('@/features/LayananLabMicroscopicResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_271 = lazy(() => import('@/features/LayananLabMicroscopicResultItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_271 = lazy(() => import('@/features/LayananLabMicroscopicResultItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_272 = lazy(() => import('@/features/LayananLabOrder/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_272 = lazy(() => import('@/features/LayananLabOrder/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_273 = lazy(() => import('@/features/LayananLabOrderItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_273 = lazy(() => import('@/features/LayananLabOrderItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_274 = lazy(() => import('@/features/LayananLabPcrResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_274 = lazy(() => import('@/features/LayananLabPcrResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_275 = lazy(() => import('@/features/LayananLabResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_275 = lazy(() => import('@/features/LayananLabResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_276 = lazy(() => import('@/features/LayananLabResultNote/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_276 = lazy(() => import('@/features/LayananLabResultNote/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_277 = lazy(() => import('@/features/LayananLabSensitivityResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_277 = lazy(() => import('@/features/LayananLabSensitivityResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_278 = lazy(() => import('@/features/LayananLeftoverMedicationVoucher/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_278 = lazy(() => import('@/features/LayananLeftoverMedicationVoucher/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_279 = lazy(() => import('@/features/LayananLeftoverMedicationVoucherItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_279 = lazy(() => import('@/features/LayananLeftoverMedicationVoucherItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_280 = lazy(() => import('@/features/LayananMedicalProcedure/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_280 = lazy(() => import('@/features/LayananMedicalProcedure/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_281 = lazy(() => import('@/features/LayananMedicalProcedureStaff/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_281 = lazy(() => import('@/features/LayananMedicalProcedureStaff/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_282 = lazy(() => import('@/features/LayananMedicalSupplyUsage/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_282 = lazy(() => import('@/features/LayananMedicalSupplyUsage/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_283 = lazy(() => import('@/features/LayananMedicalSupplyUsageItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_283 = lazy(() => import('@/features/LayananMedicalSupplyUsageItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_284 = lazy(() => import('@/features/LayananMedicationIteration/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_284 = lazy(() => import('@/features/LayananMedicationIteration/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_285 = lazy(() => import('@/features/LayananMedicationServiceLimit/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_285 = lazy(() => import('@/features/LayananMedicationServiceLimit/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_286 = lazy(() => import('@/features/LayananMedicineDelivery/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_286 = lazy(() => import('@/features/LayananMedicineDelivery/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_287 = lazy(() => import('@/features/LayananMortuaryRecord/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_287 = lazy(() => import('@/features/LayananMortuaryRecord/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_288 = lazy(() => import('@/features/LayananOxygenUsage/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_288 = lazy(() => import('@/features/LayananOxygenUsage/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_289 = lazy(() => import('@/features/LayananPathologyAnatomyResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_289 = lazy(() => import('@/features/LayananPathologyAnatomyResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_290 = lazy(() => import('@/features/LayananPathologyImmunofluorescenceResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_290 = lazy(() => import('@/features/LayananPathologyImmunofluorescenceResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_291 = lazy(() => import('@/features/LayananPathologyMolecularResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_291 = lazy(() => import('@/features/LayananPathologyMolecularResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_292 = lazy(() => import('@/features/LayananPatientComplaint/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_292 = lazy(() => import('@/features/LayananPatientComplaint/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_293 = lazy(() => import('@/features/LayananPatientDeathRecord/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_293 = lazy(() => import('@/features/LayananPatientDeathRecord/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_294 = lazy(() => import('@/features/LayananPatientDischargeRecord/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_294 = lazy(() => import('@/features/LayananPatientDischargeRecord/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_295 = lazy(() => import('@/features/LayananPharmacyDispense/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_295 = lazy(() => import('@/features/LayananPharmacyDispense/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_296 = lazy(() => import('@/features/LayananPharmacyOutpatientQueue/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_296 = lazy(() => import('@/features/LayananPharmacyOutpatientQueue/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_297 = lazy(() => import('@/features/LayananPharmacyReturn/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_297 = lazy(() => import('@/features/LayananPharmacyReturn/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_298 = lazy(() => import('@/features/LayananPharmacyServiceFee/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_298 = lazy(() => import('@/features/LayananPharmacyServiceFee/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_299 = lazy(() => import('@/features/LayananPharmacyServiceTime/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_299 = lazy(() => import('@/features/LayananPharmacyServiceTime/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_300 = lazy(() => import('@/features/LayananPharmacyServiceTimeStage/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_300 = lazy(() => import('@/features/LayananPharmacyServiceTimeStage/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_301 = lazy(() => import('@/features/LayananPrescription/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_301 = lazy(() => import('@/features/LayananPrescription/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_302 = lazy(() => import('@/features/LayananPrescriptionFulfillment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_302 = lazy(() => import('@/features/LayananPrescriptionFulfillment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_303 = lazy(() => import('@/features/LayananPrescriptionFulfillmentItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_303 = lazy(() => import('@/features/LayananPrescriptionFulfillmentItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_304 = lazy(() => import('@/features/LayananPrescriptionInitialReview/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_304 = lazy(() => import('@/features/LayananPrescriptionInitialReview/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_305 = lazy(() => import('@/features/LayananPrescriptionItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_305 = lazy(() => import('@/features/LayananPrescriptionItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_306 = lazy(() => import('@/features/LayananRadiologyOrder/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_306 = lazy(() => import('@/features/LayananRadiologyOrder/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_307 = lazy(() => import('@/features/LayananRadiologyOrderItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_307 = lazy(() => import('@/features/LayananRadiologyOrderItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_308 = lazy(() => import('@/features/LayananRadiologyResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_308 = lazy(() => import('@/features/LayananRadiologyResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_309 = lazy(() => import('@/features/LayananRadiologyViewerLog/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_309 = lazy(() => import('@/features/LayananRadiologyViewerLog/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_310 = lazy(() => import('@/features/LayananSurgicalSafetyEvaluationResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_310 = lazy(() => import('@/features/LayananSurgicalSafetyEvaluationResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_311 = lazy(() => import('@/features/LayananTelemedicineSession/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_311 = lazy(() => import('@/features/LayananTelemedicineSession/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_312 = lazy(() => import('@/features/LayananTreatmentProtocol/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_312 = lazy(() => import('@/features/LayananTreatmentProtocol/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_313 = lazy(() => import('@/features/LayananTreatmentProtocolStep/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_313 = lazy(() => import('@/features/LayananTreatmentProtocolStep/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_314 = lazy(() => import('@/features/LayananTreatmentProtocolStepDrug/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_314 = lazy(() => import('@/features/LayananTreatmentProtocolStepDrug/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_315 = lazy(() => import('@/features/MedicalRecordAbciProcedure/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_315 = lazy(() => import('@/features/MedicalRecordAbciProcedure/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_316 = lazy(() => import('@/features/MedicalRecordAbdomenExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_316 = lazy(() => import('@/features/MedicalRecordAbdomenExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_317 = lazy(() => import('@/features/MedicalRecordAdmissionMedicationReconciliation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_317 = lazy(() => import('@/features/MedicalRecordAdmissionMedicationReconciliation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_318 = lazy(() => import('@/features/MedicalRecordAdmissionMedicationReconciliationItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_318 = lazy(() => import('@/features/MedicalRecordAdmissionMedicationReconciliationItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_319 = lazy(() => import('@/features/MedicalRecordAllergy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_319 = lazy(() => import('@/features/MedicalRecordAllergy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_320 = lazy(() => import('@/features/MedicalRecordAnalExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_320 = lazy(() => import('@/features/MedicalRecordAnalExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_321 = lazy(() => import('@/features/MedicalRecordAnamnesis/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_321 = lazy(() => import('@/features/MedicalRecordAnamnesis/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_322 = lazy(() => import('@/features/MedicalRecordAnamnesisSource/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_322 = lazy(() => import('@/features/MedicalRecordAnamnesisSource/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_323 = lazy(() => import('@/features/MedicalRecordAnesthesiaPreparation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_323 = lazy(() => import('@/features/MedicalRecordAnesthesiaPreparation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_324 = lazy(() => import('@/features/MedicalRecordBackExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_324 = lazy(() => import('@/features/MedicalRecordBackExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_325 = lazy(() => import('@/features/MedicalRecordBaepAnxietyDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_325 = lazy(() => import('@/features/MedicalRecordBaepAnxietyDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_326 = lazy(() => import('@/features/MedicalRecordBaepCognitiveDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_326 = lazy(() => import('@/features/MedicalRecordBaepCognitiveDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_327 = lazy(() => import('@/features/MedicalRecordBaepDepressionDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_327 = lazy(() => import('@/features/MedicalRecordBaepDepressionDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_328 = lazy(() => import('@/features/MedicalRecordBaepDysphagiaDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_328 = lazy(() => import('@/features/MedicalRecordBaepDysphagiaDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_329 = lazy(() => import('@/features/MedicalRecordBaepInsomniaDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_329 = lazy(() => import('@/features/MedicalRecordBaepInsomniaDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_330 = lazy(() => import('@/features/MedicalRecordBaepInterventionProtocol/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_330 = lazy(() => import('@/features/MedicalRecordBaepInterventionProtocol/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_331 = lazy(() => import('@/features/MedicalRecordBaepMotorDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_331 = lazy(() => import('@/features/MedicalRecordBaepMotorDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_332 = lazy(() => import('@/features/MedicalRecordBaepSensoryDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_332 = lazy(() => import('@/features/MedicalRecordBaepSensoryDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_333 = lazy(() => import('@/features/MedicalRecordBaepStimulationProtocolDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_333 = lazy(() => import('@/features/MedicalRecordBaepStimulationProtocolDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_334 = lazy(() => import('@/features/MedicalRecordBarthelIndexAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_334 = lazy(() => import('@/features/MedicalRecordBarthelIndexAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_335 = lazy(() => import('@/features/MedicalRecordBirthCertificateLetter/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_335 = lazy(() => import('@/features/MedicalRecordBirthCertificateLetter/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_336 = lazy(() => import('@/features/MedicalRecordBloodTransfusion/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_336 = lazy(() => import('@/features/MedicalRecordBloodTransfusion/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_337 = lazy(() => import('@/features/MedicalRecordBloodTransfusionDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_337 = lazy(() => import('@/features/MedicalRecordBloodTransfusionDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_338 = lazy(() => import('@/features/MedicalRecordBloodTransfusionObservation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_338 = lazy(() => import('@/features/MedicalRecordBloodTransfusionObservation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_339 = lazy(() => import('@/features/MedicalRecordBreastExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_339 = lazy(() => import('@/features/MedicalRecordBreastExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_340 = lazy(() => import('@/features/MedicalRecordCaseManagerAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_340 = lazy(() => import('@/features/MedicalRecordCaseManagerAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_341 = lazy(() => import('@/features/MedicalRecordCatClamsExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_341 = lazy(() => import('@/features/MedicalRecordCatClamsExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_342 = lazy(() => import('@/features/MedicalRecordChestExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_342 = lazy(() => import('@/features/MedicalRecordChestExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_343 = lazy(() => import('@/features/MedicalRecordChiefComplaint/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_343 = lazy(() => import('@/features/MedicalRecordChiefComplaint/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_344 = lazy(() => import('@/features/MedicalRecordClinicalNote/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_344 = lazy(() => import('@/features/MedicalRecordClinicalNote/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_345 = lazy(() => import('@/features/MedicalRecordClinicalNoteCoManagement/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_345 = lazy(() => import('@/features/MedicalRecordClinicalNoteCoManagement/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_346 = lazy(() => import('@/features/MedicalRecordClinicalNoteVerification/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_346 = lazy(() => import('@/features/MedicalRecordClinicalNoteVerification/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_347 = lazy(() => import('@/features/MedicalRecordControlSchedule/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_347 = lazy(() => import('@/features/MedicalRecordControlSchedule/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_348 = lazy(() => import('@/features/MedicalRecordCoughAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_348 = lazy(() => import('@/features/MedicalRecordCoughAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_349 = lazy(() => import('@/features/MedicalRecordDentalExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_349 = lazy(() => import('@/features/MedicalRecordDentalExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_350 = lazy(() => import('@/features/MedicalRecordDiagnosis/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_350 = lazy(() => import('@/features/MedicalRecordDiagnosis/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_351 = lazy(() => import('@/features/MedicalRecordDiagnosisIndicatorMapping/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_351 = lazy(() => import('@/features/MedicalRecordDiagnosisIndicatorMapping/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_352 = lazy(() => import('@/features/MedicalRecordDifferentialDiagnosis/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_352 = lazy(() => import('@/features/MedicalRecordDifferentialDiagnosis/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_353 = lazy(() => import('@/features/MedicalRecordDischargeMedicationReconciliation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_353 = lazy(() => import('@/features/MedicalRecordDischargeMedicationReconciliation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_354 = lazy(() => import('@/features/MedicalRecordDischargeMedicationReconciliationItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_354 = lazy(() => import('@/features/MedicalRecordDischargeMedicationReconciliationItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_355 = lazy(() => import('@/features/MedicalRecordDischargePlanningRiskFactor/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_355 = lazy(() => import('@/features/MedicalRecordDischargePlanningRiskFactor/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_356 = lazy(() => import('@/features/MedicalRecordDischargePlanningScreening/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_356 = lazy(() => import('@/features/MedicalRecordDischargePlanningScreening/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_357 = lazy(() => import('@/features/MedicalRecordDischargeSummary/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_357 = lazy(() => import('@/features/MedicalRecordDischargeSummary/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_358 = lazy(() => import('@/features/MedicalRecordDoctorProcedureConsent/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_358 = lazy(() => import('@/features/MedicalRecordDoctorProcedureConsent/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_359 = lazy(() => import('@/features/MedicalRecordDocumentUpload/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_359 = lazy(() => import('@/features/MedicalRecordDocumentUpload/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_360 = lazy(() => import('@/features/MedicalRecordEarExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_360 = lazy(() => import('@/features/MedicalRecordEarExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_361 = lazy(() => import('@/features/MedicalRecordEegExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_361 = lazy(() => import('@/features/MedicalRecordEegExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_362 = lazy(() => import('@/features/MedicalRecordEkgExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_362 = lazy(() => import('@/features/MedicalRecordEkgExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_363 = lazy(() => import('@/features/MedicalRecordEmergencyEducation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_363 = lazy(() => import('@/features/MedicalRecordEmergencyEducation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_364 = lazy(() => import('@/features/MedicalRecordEmgExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_364 = lazy(() => import('@/features/MedicalRecordEmgExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_365 = lazy(() => import('@/features/MedicalRecordEndOfLifeEducation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_365 = lazy(() => import('@/features/MedicalRecordEndOfLifeEducation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_366 = lazy(() => import('@/features/MedicalRecordEndOfLifePsychosocialRelationship/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_366 = lazy(() => import('@/features/MedicalRecordEndOfLifePsychosocialRelationship/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_367 = lazy(() => import('@/features/MedicalRecordEpfraAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_367 = lazy(() => import('@/features/MedicalRecordEpfraAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_368 = lazy(() => import('@/features/MedicalRecordExaminationType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_368 = lazy(() => import('@/features/MedicalRecordExaminationType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_369 = lazy(() => import('@/features/MedicalRecordExternalRiskFactor/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_369 = lazy(() => import('@/features/MedicalRecordExternalRiskFactor/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_370 = lazy(() => import('@/features/MedicalRecordEyeExamDocumentUpload/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_370 = lazy(() => import('@/features/MedicalRecordEyeExamDocumentUpload/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_371 = lazy(() => import('@/features/MedicalRecordEyeExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_371 = lazy(() => import('@/features/MedicalRecordEyeExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_372 = lazy(() => import('@/features/MedicalRecordFamilyMedicalHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_372 = lazy(() => import('@/features/MedicalRecordFamilyMedicalHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_373 = lazy(() => import('@/features/MedicalRecordFamilyPlanningObstetrics/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_373 = lazy(() => import('@/features/MedicalRecordFamilyPlanningObstetrics/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_374 = lazy(() => import('@/features/MedicalRecordFibroscanResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_374 = lazy(() => import('@/features/MedicalRecordFibroscanResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_375 = lazy(() => import('@/features/MedicalRecordFingerExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_375 = lazy(() => import('@/features/MedicalRecordFingerExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_376 = lazy(() => import('@/features/MedicalRecordFingernailExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_376 = lazy(() => import('@/features/MedicalRecordFingernailExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_377 = lazy(() => import('@/features/MedicalRecordFluidBalanceAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_377 = lazy(() => import('@/features/MedicalRecordFluidBalanceAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_378 = lazy(() => import('@/features/MedicalRecordFluidBalanceAssessmentDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_378 = lazy(() => import('@/features/MedicalRecordFluidBalanceAssessmentDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_379 = lazy(() => import('@/features/MedicalRecordFluidFinalBalance/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_379 = lazy(() => import('@/features/MedicalRecordFluidFinalBalance/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_380 = lazy(() => import('@/features/MedicalRecordFoodAllergenExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_380 = lazy(() => import('@/features/MedicalRecordFoodAllergenExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_381 = lazy(() => import('@/features/MedicalRecordForearmExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_381 = lazy(() => import('@/features/MedicalRecordForearmExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_382 = lazy(() => import('@/features/MedicalRecordFunctionalAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_382 = lazy(() => import('@/features/MedicalRecordFunctionalAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_383 = lazy(() => import('@/features/MedicalRecordFunctionalStatusAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_383 = lazy(() => import('@/features/MedicalRecordFunctionalStatusAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_384 = lazy(() => import('@/features/MedicalRecordGeneralExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_384 = lazy(() => import('@/features/MedicalRecordGeneralExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_385 = lazy(() => import('@/features/MedicalRecordGenitalExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_385 = lazy(() => import('@/features/MedicalRecordGenitalExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_386 = lazy(() => import('@/features/MedicalRecordGetUpAndGoTestAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_386 = lazy(() => import('@/features/MedicalRecordGetUpAndGoTestAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_387 = lazy(() => import('@/features/MedicalRecordGraceRiskScoreAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_387 = lazy(() => import('@/features/MedicalRecordGraceRiskScoreAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_388 = lazy(() => import('@/features/MedicalRecordGynecologyHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_388 = lazy(() => import('@/features/MedicalRecordGynecologyHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_389 = lazy(() => import('@/features/MedicalRecordGynecologyUltrasound/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_389 = lazy(() => import('@/features/MedicalRecordGynecologyUltrasound/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_390 = lazy(() => import('@/features/MedicalRecordHairExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_390 = lazy(() => import('@/features/MedicalRecordHairExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_391 = lazy(() => import('@/features/MedicalRecordHandJointExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_391 = lazy(() => import('@/features/MedicalRecordHandJointExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_392 = lazy(() => import('@/features/MedicalRecordHeadExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_392 = lazy(() => import('@/features/MedicalRecordHeadExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_393 = lazy(() => import('@/features/MedicalRecordHealthCertificate/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_393 = lazy(() => import('@/features/MedicalRecordHealthCertificate/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_394 = lazy(() => import('@/features/MedicalRecordHemodialysisLetter/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_394 = lazy(() => import('@/features/MedicalRecordHemodialysisLetter/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_395 = lazy(() => import('@/features/MedicalRecordHospitalizationCertificate/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_395 = lazy(() => import('@/features/MedicalRecordHospitalizationCertificate/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_396 = lazy(() => import('@/features/MedicalRecordHumptyDumptyFallScaleAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_396 = lazy(() => import('@/features/MedicalRecordHumptyDumptyFallScaleAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_397 = lazy(() => import('@/features/MedicalRecordIcd10CauseOfDeathCode/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_397 = lazy(() => import('@/features/MedicalRecordIcd10CauseOfDeathCode/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_398 = lazy(() => import('@/features/MedicalRecordIcd10Code/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_398 = lazy(() => import('@/features/MedicalRecordIcd10Code/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_399 = lazy(() => import('@/features/MedicalRecordIcd9CmCode/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_399 = lazy(() => import('@/features/MedicalRecordIcd9CmCode/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_400 = lazy(() => import('@/features/MedicalRecordIllnessProgressionHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_400 = lazy(() => import('@/features/MedicalRecordIllnessProgressionHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_401 = lazy(() => import('@/features/MedicalRecordImageMarker/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_401 = lazy(() => import('@/features/MedicalRecordImageMarker/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_402 = lazy(() => import('@/features/MedicalRecordImageMarkerPoint/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_402 = lazy(() => import('@/features/MedicalRecordImageMarkerPoint/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_403 = lazy(() => import('@/features/MedicalRecordImmunizationVaccination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_403 = lazy(() => import('@/features/MedicalRecordImmunizationVaccination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_404 = lazy(() => import('@/features/MedicalRecordImplementation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_404 = lazy(() => import('@/features/MedicalRecordImplementation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_405 = lazy(() => import('@/features/MedicalRecordImplementationChecklistItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_405 = lazy(() => import('@/features/MedicalRecordImplementationChecklistItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_406 = lazy(() => import('@/features/MedicalRecordImplementationNote/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_406 = lazy(() => import('@/features/MedicalRecordImplementationNote/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_407 = lazy(() => import('@/features/MedicalRecordInhalantAllergenExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_407 = lazy(() => import('@/features/MedicalRecordInhalantAllergenExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_408 = lazy(() => import('@/features/MedicalRecordInpatientCarePlan/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_408 = lazy(() => import('@/features/MedicalRecordInpatientCarePlan/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_409 = lazy(() => import('@/features/MedicalRecordInterventionIndicatorMapping/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_409 = lazy(() => import('@/features/MedicalRecordInterventionIndicatorMapping/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_410 = lazy(() => import('@/features/MedicalRecordInterventionProtocol/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_410 = lazy(() => import('@/features/MedicalRecordInterventionProtocol/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_411 = lazy(() => import('@/features/MedicalRecordInterventionProtocolDetail/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_411 = lazy(() => import('@/features/MedicalRecordInterventionProtocolDetail/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_412 = lazy(() => import('@/features/MedicalRecordInterventionRecommendation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_412 = lazy(() => import('@/features/MedicalRecordInterventionRecommendation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_413 = lazy(() => import('@/features/MedicalRecordIntradialyticHdMonitoring/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_413 = lazy(() => import('@/features/MedicalRecordIntradialyticHdMonitoring/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_414 = lazy(() => import('@/features/MedicalRecordKillipClassAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_414 = lazy(() => import('@/features/MedicalRecordKillipClassAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_415 = lazy(() => import('@/features/MedicalRecordLabResultSummary/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_415 = lazy(() => import('@/features/MedicalRecordLabResultSummary/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_416 = lazy(() => import('@/features/MedicalRecordLabResultSummaryItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_416 = lazy(() => import('@/features/MedicalRecordLabResultSummaryItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_417 = lazy(() => import('@/features/MedicalRecordLegJointExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_417 = lazy(() => import('@/features/MedicalRecordLegJointExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_418 = lazy(() => import('@/features/MedicalRecordLipExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_418 = lazy(() => import('@/features/MedicalRecordLipExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_419 = lazy(() => import('@/features/MedicalRecordLowerGiTractExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_419 = lazy(() => import('@/features/MedicalRecordLowerGiTractExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_420 = lazy(() => import('@/features/MedicalRecordLowerLegExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_420 = lazy(() => import('@/features/MedicalRecordLowerLegExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_421 = lazy(() => import('@/features/MedicalRecordMaternalPregnancyHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_421 = lazy(() => import('@/features/MedicalRecordMaternalPregnancyHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_422 = lazy(() => import('@/features/MedicalRecordMchatAssessmentExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_422 = lazy(() => import('@/features/MedicalRecordMchatAssessmentExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_423 = lazy(() => import('@/features/MedicalRecordMedicalCheckupResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_423 = lazy(() => import('@/features/MedicalRecordMedicalCheckupResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_424 = lazy(() => import('@/features/MedicalRecordMedicationAdministrationHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_424 = lazy(() => import('@/features/MedicalRecordMedicationAdministrationHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_425 = lazy(() => import('@/features/MedicalRecordMmpiTest/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_425 = lazy(() => import('@/features/MedicalRecordMmpiTest/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_426 = lazy(() => import('@/features/MedicalRecordModifiedBarthelIndexAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_426 = lazy(() => import('@/features/MedicalRecordModifiedBarthelIndexAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_427 = lazy(() => import('@/features/MedicalRecordMorseFallScaleAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_427 = lazy(() => import('@/features/MedicalRecordMorseFallScaleAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_428 = lazy(() => import('@/features/MedicalRecordNeckExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_428 = lazy(() => import('@/features/MedicalRecordNeckExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_429 = lazy(() => import('@/features/MedicalRecordNoseExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_429 = lazy(() => import('@/features/MedicalRecordNoseExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_430 = lazy(() => import('@/features/MedicalRecordNursingCarePlan/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_430 = lazy(() => import('@/features/MedicalRecordNursingCarePlan/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_431 = lazy(() => import('@/features/MedicalRecordNursingCarePlanImplementation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_431 = lazy(() => import('@/features/MedicalRecordNursingCarePlanImplementation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_432 = lazy(() => import('@/features/MedicalRecordNursingDiagnosis/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_432 = lazy(() => import('@/features/MedicalRecordNursingDiagnosis/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_433 = lazy(() => import('@/features/MedicalRecordNursingImplementation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_433 = lazy(() => import('@/features/MedicalRecordNursingImplementation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_434 = lazy(() => import('@/features/MedicalRecordNursingIndicator/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_434 = lazy(() => import('@/features/MedicalRecordNursingIndicator/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_435 = lazy(() => import('@/features/MedicalRecordNursingIndicatorImplementation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_435 = lazy(() => import('@/features/MedicalRecordNursingIndicatorImplementation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_436 = lazy(() => import('@/features/MedicalRecordNursingIndicatorType/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_436 = lazy(() => import('@/features/MedicalRecordNursingIndicatorType/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_437 = lazy(() => import('@/features/MedicalRecordNutritionDietPattern/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_437 = lazy(() => import('@/features/MedicalRecordNutritionDietPattern/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_438 = lazy(() => import('@/features/MedicalRecordObstetricHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_438 = lazy(() => import('@/features/MedicalRecordObstetricHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_439 = lazy(() => import('@/features/MedicalRecordObstetrics/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_439 = lazy(() => import('@/features/MedicalRecordObstetrics/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_440 = lazy(() => import('@/features/MedicalRecordOtherHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_440 = lazy(() => import('@/features/MedicalRecordOtherHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_441 = lazy(() => import('@/features/MedicalRecordPainScoreAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_441 = lazy(() => import('@/features/MedicalRecordPainScoreAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_442 = lazy(() => import('@/features/MedicalRecordPalateExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_442 = lazy(() => import('@/features/MedicalRecordPalateExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_443 = lazy(() => import('@/features/MedicalRecordParentalHealthHistoryScreening/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_443 = lazy(() => import('@/features/MedicalRecordParentalHealthHistoryScreening/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_444 = lazy(() => import('@/features/MedicalRecordPatientFamilyEducation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_444 = lazy(() => import('@/features/MedicalRecordPatientFamilyEducation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_445 = lazy(() => import('@/features/MedicalRecordPatientNutritionProblem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_445 = lazy(() => import('@/features/MedicalRecordPatientNutritionProblem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_446 = lazy(() => import('@/features/MedicalRecordPatientTransferSheet/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_446 = lazy(() => import('@/features/MedicalRecordPatientTransferSheet/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_447 = lazy(() => import('@/features/MedicalRecordPediatricStatus/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_447 = lazy(() => import('@/features/MedicalRecordPediatricStatus/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_448 = lazy(() => import('@/features/MedicalRecordPharmacyDiagnosis/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_448 = lazy(() => import('@/features/MedicalRecordPharmacyDiagnosis/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_449 = lazy(() => import('@/features/MedicalRecordPharynxExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_449 = lazy(() => import('@/features/MedicalRecordPharynxExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_450 = lazy(() => import('@/features/MedicalRecordPhysicalAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_450 = lazy(() => import('@/features/MedicalRecordPhysicalAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_451 = lazy(() => import('@/features/MedicalRecordPhysicalExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_451 = lazy(() => import('@/features/MedicalRecordPhysicalExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_452 = lazy(() => import('@/features/MedicalRecordPlanAndTherapy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_452 = lazy(() => import('@/features/MedicalRecordPlanAndTherapy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_453 = lazy(() => import('@/features/MedicalRecordPreAnesthesiaSedationAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_453 = lazy(() => import('@/features/MedicalRecordPreAnesthesiaSedationAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_454 = lazy(() => import('@/features/MedicalRecordPressureUlcerRiskAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_454 = lazy(() => import('@/features/MedicalRecordPressureUlcerRiskAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_455 = lazy(() => import('@/features/MedicalRecordProcedureConsentInformation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_455 = lazy(() => import('@/features/MedicalRecordProcedureConsentInformation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_456 = lazy(() => import('@/features/MedicalRecordProcedureConsentInformationGiver/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_456 = lazy(() => import('@/features/MedicalRecordProcedureConsentInformationGiver/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_457 = lazy(() => import('@/features/MedicalRecordProcedureConsentInformationItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_457 = lazy(() => import('@/features/MedicalRecordProcedureConsentInformationItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_458 = lazy(() => import('@/features/MedicalRecordProcedureConsentInformationReceiver/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_458 = lazy(() => import('@/features/MedicalRecordProcedureConsentInformationReceiver/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_459 = lazy(() => import('@/features/MedicalRecordProcedureConsentPatientAcknowledgement/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_459 = lazy(() => import('@/features/MedicalRecordProcedureConsentPatientAcknowledgement/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_460 = lazy(() => import('@/features/MedicalRecordProcedureSurgery/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_460 = lazy(() => import('@/features/MedicalRecordProcedureSurgery/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_461 = lazy(() => import('@/features/MedicalRecordRadiologyResultSummary/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_461 = lazy(() => import('@/features/MedicalRecordRadiologyResultSummary/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_462 = lazy(() => import('@/features/MedicalRecordRadiologyResultSummaryItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_462 = lazy(() => import('@/features/MedicalRecordRadiologyResultSummaryItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_463 = lazy(() => import('@/features/MedicalRecordRavenTestExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_463 = lazy(() => import('@/features/MedicalRecordRavenTestExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_464 = lazy(() => import('@/features/MedicalRecordRecordFileLoan/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_464 = lazy(() => import('@/features/MedicalRecordRecordFileLoan/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_465 = lazy(() => import('@/features/MedicalRecordRehabilitationProcedureExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_465 = lazy(() => import('@/features/MedicalRecordRehabilitationProcedureExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_466 = lazy(() => import('@/features/MedicalRecordRehabilitationProcedureExaminationItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_466 = lazy(() => import('@/features/MedicalRecordRehabilitationProcedureExaminationItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_467 = lazy(() => import('@/features/MedicalRecordRiskFactor/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_467 = lazy(() => import('@/features/MedicalRecordRiskFactor/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_468 = lazy(() => import('@/features/MedicalRecordSickLeaveCertificate/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_468 = lazy(() => import('@/features/MedicalRecordSickLeaveCertificate/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_469 = lazy(() => import('@/features/MedicalRecordSkinPrickTestExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_469 = lazy(() => import('@/features/MedicalRecordSkinPrickTestExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_470 = lazy(() => import('@/features/MedicalRecordSocialCondition/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_470 = lazy(() => import('@/features/MedicalRecordSocialCondition/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_471 = lazy(() => import('@/features/MedicalRecordSurgery/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_471 = lazy(() => import('@/features/MedicalRecordSurgery/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_472 = lazy(() => import('@/features/MedicalRecordSurgeryPerformer/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_472 = lazy(() => import('@/features/MedicalRecordSurgeryPerformer/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_473 = lazy(() => import('@/features/MedicalRecordSurgicalProcedureHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_473 = lazy(() => import('@/features/MedicalRecordSurgicalProcedureHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_474 = lazy(() => import('@/features/MedicalRecordTbDiseaseHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_474 = lazy(() => import('@/features/MedicalRecordTbDiseaseHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_475 = lazy(() => import('@/features/MedicalRecordThighExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_475 = lazy(() => import('@/features/MedicalRecordThighExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_476 = lazy(() => import('@/features/MedicalRecordThroatExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_476 = lazy(() => import('@/features/MedicalRecordThroatExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_477 = lazy(() => import('@/features/MedicalRecordToeExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_477 = lazy(() => import('@/features/MedicalRecordToeExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_478 = lazy(() => import('@/features/MedicalRecordToenailExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_478 = lazy(() => import('@/features/MedicalRecordToenailExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_479 = lazy(() => import('@/features/MedicalRecordTongueExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_479 = lazy(() => import('@/features/MedicalRecordTongueExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_480 = lazy(() => import('@/features/MedicalRecordTonsilExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_480 = lazy(() => import('@/features/MedicalRecordTonsilExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_481 = lazy(() => import('@/features/MedicalRecordTranscranialDopplerExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_481 = lazy(() => import('@/features/MedicalRecordTranscranialDopplerExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_482 = lazy(() => import('@/features/MedicalRecordTranscranialDopplerWindow/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_482 = lazy(() => import('@/features/MedicalRecordTranscranialDopplerWindow/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_483 = lazy(() => import('@/features/MedicalRecordTransferMedicationReconciliation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_483 = lazy(() => import('@/features/MedicalRecordTransferMedicationReconciliation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_484 = lazy(() => import('@/features/MedicalRecordTransferMedicationReconciliationItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_484 = lazy(() => import('@/features/MedicalRecordTransferMedicationReconciliationItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_485 = lazy(() => import('@/features/MedicalRecordTreatmentHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_485 = lazy(() => import('@/features/MedicalRecordTreatmentHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_486 = lazy(() => import('@/features/MedicalRecordTriage/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_486 = lazy(() => import('@/features/MedicalRecordTriage/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_487 = lazy(() => import('@/features/MedicalRecordTumorAssessment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_487 = lazy(() => import('@/features/MedicalRecordTumorAssessment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_488 = lazy(() => import('@/features/MedicalRecordUltrasoundGuidedProcedure/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_488 = lazy(() => import('@/features/MedicalRecordUltrasoundGuidedProcedure/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_489 = lazy(() => import('@/features/MedicalRecordUpperArmExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_489 = lazy(() => import('@/features/MedicalRecordUpperArmExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_490 = lazy(() => import('@/features/MedicalRecordUpperGiTractExamination/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_490 = lazy(() => import('@/features/MedicalRecordUpperGiTractExamination/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_491 = lazy(() => import('@/features/MedicalRecordVitalSign/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_491 = lazy(() => import('@/features/MedicalRecordVitalSign/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_492 = lazy(() => import('@/features/PasienPatientPortalAccount/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_492 = lazy(() => import('@/features/PasienPatientPortalAccount/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_493 = lazy(() => import('@/features/PegawaiEmployeeContact/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_493 = lazy(() => import('@/features/PegawaiEmployeeContact/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_494 = lazy(() => import('@/features/PegawaiEmployeeIdentityCard/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_494 = lazy(() => import('@/features/PegawaiEmployeeIdentityCard/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_495 = lazy(() => import('@/features/PegawaiJadwalShift/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_495 = lazy(() => import('@/features/PegawaiJadwalShift/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_496 = lazy(() => import('@/features/PegawaiPracticeLicense/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_496 = lazy(() => import('@/features/PegawaiPracticeLicense/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_497 = lazy(() => import('@/features/PegawaiRemunerasiJasaMedis/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_497 = lazy(() => import('@/features/PegawaiRemunerasiJasaMedis/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_498 = lazy(() => import('@/features/PembatalanDocumentCancellation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_498 = lazy(() => import('@/features/PembatalanDocumentCancellation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_499 = lazy(() => import('@/features/PembatalanFinalResult/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_499 = lazy(() => import('@/features/PembatalanFinalResult/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_500 = lazy(() => import('@/features/PembatalanMedicalRecordCancellation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_500 = lazy(() => import('@/features/PembatalanMedicalRecordCancellation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_501 = lazy(() => import('@/features/PembatalanReturnCancellation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_501 = lazy(() => import('@/features/PembatalanReturnCancellation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_502 = lazy(() => import('@/features/PembatalanVisitCancellation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_502 = lazy(() => import('@/features/PembatalanVisitCancellation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_503 = lazy(() => import('@/features/PembayaranCashier/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_503 = lazy(() => import('@/features/PembayaranCashier/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_504 = lazy(() => import('@/features/PembayaranCashierTransaction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_504 = lazy(() => import('@/features/PembayaranCashierTransaction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_505 = lazy(() => import('@/features/PembayaranClaimInvoice/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_505 = lazy(() => import('@/features/PembayaranClaimInvoice/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_506 = lazy(() => import('@/features/PembayaranCorporateReceivable/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_506 = lazy(() => import('@/features/PembayaranCorporateReceivable/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_507 = lazy(() => import('@/features/PembayaranCorporateReceivableSettlement/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_507 = lazy(() => import('@/features/PembayaranCorporateReceivableSettlement/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_508 = lazy(() => import('@/features/PembayaranDeposit/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_508 = lazy(() => import('@/features/PembayaranDeposit/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_509 = lazy(() => import('@/features/PembayaranDepositRefund/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_509 = lazy(() => import('@/features/PembayaranDepositRefund/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_510 = lazy(() => import('@/features/PembayaranDiscount/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_510 = lazy(() => import('@/features/PembayaranDiscount/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_511 = lazy(() => import('@/features/PembayaranDoctorDiscount/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_511 = lazy(() => import('@/features/PembayaranDoctorDiscount/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_512 = lazy(() => import('@/features/PembayaranEdc/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_512 = lazy(() => import('@/features/PembayaranEdc/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_513 = lazy(() => import('@/features/PembayaranInvoice/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_513 = lazy(() => import('@/features/PembayaranInvoice/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_514 = lazy(() => import('@/features/PembayaranInvoiceCancellation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_514 = lazy(() => import('@/features/PembayaranInvoiceCancellation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_515 = lazy(() => import('@/features/PembayaranInvoiceGuarantor/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_515 = lazy(() => import('@/features/PembayaranInvoiceGuarantor/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_516 = lazy(() => import('@/features/PembayaranInvoiceItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_516 = lazy(() => import('@/features/PembayaranInvoiceItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_517 = lazy(() => import('@/features/PembayaranInvoiceMerge/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_517 = lazy(() => import('@/features/PembayaranInvoiceMerge/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_518 = lazy(() => import('@/features/PembayaranInvoiceSubsidy/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_518 = lazy(() => import('@/features/PembayaranInvoiceSubsidy/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_519 = lazy(() => import('@/features/PembayaranPackageInvoiceItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_519 = lazy(() => import('@/features/PembayaranPackageInvoiceItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_520 = lazy(() => import('@/features/PembayaranPatientReceivable/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_520 = lazy(() => import('@/features/PembayaranPatientReceivable/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_521 = lazy(() => import('@/features/PembayaranPatientReceivableSettlement/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_521 = lazy(() => import('@/features/PembayaranPatientReceivableSettlement/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_522 = lazy(() => import('@/features/PembayaranPayment/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_522 = lazy(() => import('@/features/PembayaranPayment/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_523 = lazy(() => import('@/features/PembayaranPaymentProvider/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_523 = lazy(() => import('@/features/PembayaranPaymentProvider/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_524 = lazy(() => import('@/features/PembayaranProviderService/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_524 = lazy(() => import('@/features/PembayaranProviderService/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_525 = lazy(() => import('@/features/PembayaranRegistrationInvoice/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_525 = lazy(() => import('@/features/PembayaranRegistrationInvoice/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_526 = lazy(() => import('@/features/PembayaranTransfer/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_526 = lazy(() => import('@/features/PembayaranTransfer/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_527 = lazy(() => import('@/features/PendaftaranAccidentRecord/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_527 = lazy(() => import('@/features/PendaftaranAccidentRecord/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_528 = lazy(() => import('@/features/PendaftaranApplicant/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_528 = lazy(() => import('@/features/PendaftaranApplicant/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_529 = lazy(() => import('@/features/PendaftaranBedQueue/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_529 = lazy(() => import('@/features/PendaftaranBedQueue/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_530 = lazy(() => import('@/features/PendaftaranCoManagement/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_530 = lazy(() => import('@/features/PendaftaranCoManagement/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_531 = lazy(() => import('@/features/PendaftaranConsultation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_531 = lazy(() => import('@/features/PendaftaranConsultation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_532 = lazy(() => import('@/features/PendaftaranConsultationAnswer/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_532 = lazy(() => import('@/features/PendaftaranConsultationAnswer/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_533 = lazy(() => import('@/features/PendaftaranFunction/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_533 = lazy(() => import('@/features/PendaftaranFunction/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_534 = lazy(() => import('@/features/PendaftaranGuarantor/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_534 = lazy(() => import('@/features/PendaftaranGuarantor/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_535 = lazy(() => import('@/features/PendaftaranHistory/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_535 = lazy(() => import('@/features/PendaftaranHistory/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_536 = lazy(() => import('@/features/PendaftaranPatientEscort/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_536 = lazy(() => import('@/features/PendaftaranPatientEscort/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_537 = lazy(() => import('@/features/PendaftaranPatientEscortContact/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_537 = lazy(() => import('@/features/PendaftaranPatientEscortContact/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_538 = lazy(() => import('@/features/PendaftaranPatientEscortIdentityCard/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_538 = lazy(() => import('@/features/PendaftaranPatientEscortIdentityCard/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_539 = lazy(() => import('@/features/PendaftaranPatientGuardian/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_539 = lazy(() => import('@/features/PendaftaranPatientGuardian/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_540 = lazy(() => import('@/features/PendaftaranPatientGuardianContact/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_540 = lazy(() => import('@/features/PendaftaranPatientGuardianContact/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_541 = lazy(() => import('@/features/PendaftaranPatientGuardianIdentityCard/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_541 = lazy(() => import('@/features/PendaftaranPatientGuardianIdentityCard/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_542 = lazy(() => import('@/features/PendaftaranPatientPurpose/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_542 = lazy(() => import('@/features/PendaftaranPatientPurpose/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_543 = lazy(() => import('@/features/PendaftaranPatientTransfer/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_543 = lazy(() => import('@/features/PendaftaranPatientTransfer/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_544 = lazy(() => import('@/features/PendaftaranQueueCall/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_544 = lazy(() => import('@/features/PendaftaranQueueCall/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_545 = lazy(() => import('@/features/PendaftaranReferral/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_545 = lazy(() => import('@/features/PendaftaranReferral/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_546 = lazy(() => import('@/features/PendaftaranReferralLetter/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_546 = lazy(() => import('@/features/PendaftaranReferralLetter/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_547 = lazy(() => import('@/features/PendaftaranRegistration/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_547 = lazy(() => import('@/features/PendaftaranRegistration/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_548 = lazy(() => import('@/features/PendaftaranReservation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_548 = lazy(() => import('@/features/PendaftaranReservation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_549 = lazy(() => import('@/features/PendaftaranServiceHandover/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_549 = lazy(() => import('@/features/PendaftaranServiceHandover/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_550 = lazy(() => import('@/features/PendaftaranVisit/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_550 = lazy(() => import('@/features/PendaftaranVisit/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_551 = lazy(() => import('@/features/PendaftaranVisitCancellation/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_551 = lazy(() => import('@/features/PendaftaranVisitCancellation/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_552 = lazy(() => import('@/features/PendaftaranVisitDateChange/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_552 = lazy(() => import('@/features/PendaftaranVisitDateChange/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_553 = lazy(() => import('@/features/PendaftaranWardQueue/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_553 = lazy(() => import('@/features/PendaftaranWardQueue/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_554 = lazy(() => import('@/features/PenjaminRSAttendingPhysician/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_554 = lazy(() => import('@/features/PenjaminRSAttendingPhysician/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_555 = lazy(() => import('@/features/PenjaminRSClaimDriver/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_555 = lazy(() => import('@/features/PenjaminRSClaimDriver/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_556 = lazy(() => import('@/features/PenjaminRSDischargeMethod/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_556 = lazy(() => import('@/features/PenjaminRSDischargeMethod/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_557 = lazy(() => import('@/features/PenjualanSale/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_557 = lazy(() => import('@/features/PenjualanSale/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_558 = lazy(() => import('@/features/PenjualanSaleItem/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_558 = lazy(() => import('@/features/PenjualanSaleItem/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_559 = lazy(() => import('@/features/PenjualanSaleReturn/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_559 = lazy(() => import('@/features/PenjualanSaleReturn/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_560 = lazy(() => import('@/features/AuditActivityLog/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_561 = lazy(() => import('@/features/AuditRequestLog/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_562 = lazy(() => import('@/features/FinanceGeneralLedger/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_563 = lazy(() => import('@/features/FinanceGeneralLedger/pages/ListPage1').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_564 = lazy(() => import('@/features/MedicalRecordRetentionSchedule/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_565 = lazy(() => import('@/features/SatuSehatMasterData/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_566 = lazy(() => import('@/features/SatuSehatMasterData/pages/ListPage1').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_567 = lazy(() => import('@/features/SatuSehatMasterData/pages/ListPage2').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_568 = lazy(() => import('@/features/SatuSehatMasterData/pages/ListPage3').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_569 = lazy(() => import('@/features/SatuSehatMasterData/pages/ListPage4').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_570 = lazy(() => import('@/features/SatuSehatMasterData/pages/ListPage5').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const List_571 = lazy(() => import('@/features/SatuSehatMasterData/pages/ListPage6').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))

export interface GeneratedRoute {
  path: string
  module: string
  element: ReactElement
}

export const generatedRoutes: GeneratedRoute[] = [
  { path: '/modul/audit-incident-report', module: 'AuditIncidentReport', element: <List_0 /> },
  { path: '/modul/audit-incident-report/tambah', module: 'AuditIncidentReport', element: <Form_0 /> },
  { path: '/modul/audit-incident-report/:id/edit', module: 'AuditIncidentReport', element: <Form_0 /> },
  { path: '/modul/audit-infection-surveillance', module: 'AuditInfectionSurveillance', element: <List_1 /> },
  { path: '/modul/audit-infection-surveillance/tambah', module: 'AuditInfectionSurveillance', element: <Form_1 /> },
  { path: '/modul/audit-infection-surveillance/:id/edit', module: 'AuditInfectionSurveillance', element: <Form_1 /> },
  { path: '/modul/audit-quality-indicator', module: 'AuditQualityIndicator', element: <List_2 /> },
  { path: '/modul/audit-quality-indicator/tambah', module: 'AuditQualityIndicator', element: <Form_2 /> },
  { path: '/modul/audit-quality-indicator/:id/edit', module: 'AuditQualityIndicator', element: <Form_2 /> },
  { path: '/modul/authorization', module: 'Authorization', element: <List_3 /> },
  { path: '/modul/authorization/tambah', module: 'Authorization', element: <Form_3 /> },
  { path: '/modul/authorization/:id/edit', module: 'Authorization', element: <Form_3 /> },
  { path: '/modul/berkas-klaim-claim-completeness', module: 'BerkasKlaimClaimCompleteness', element: <List_4 /> },
  { path: '/modul/berkas-klaim-claim-completeness/tambah', module: 'BerkasKlaimClaimCompleteness', element: <Form_4 /> },
  { path: '/modul/berkas-klaim-claim-completeness/:id/edit', module: 'BerkasKlaimClaimCompleteness', element: <Form_4 /> },
  { path: '/modul/berkas-klaim-claim-completeness-comment', module: 'BerkasKlaimClaimCompletenessComment', element: <List_5 /> },
  { path: '/modul/berkas-klaim-claim-completeness-comment/tambah', module: 'BerkasKlaimClaimCompletenessComment', element: <Form_5 /> },
  { path: '/modul/berkas-klaim-claim-completeness-comment/:id/edit', module: 'BerkasKlaimClaimCompletenessComment', element: <Form_5 /> },
  { path: '/modul/berkas-klaim-claim-file', module: 'BerkasKlaimClaimFile', element: <List_6 /> },
  { path: '/modul/berkas-klaim-claim-file/tambah', module: 'BerkasKlaimClaimFile', element: <Form_6 /> },
  { path: '/modul/berkas-klaim-claim-file/:id/edit', module: 'BerkasKlaimClaimFile', element: <Form_6 /> },
  { path: '/modul/berkas-klaim-clinical-lab-claim', module: 'BerkasKlaimClinicalLabClaim', element: <List_7 /> },
  { path: '/modul/berkas-klaim-clinical-lab-claim/tambah', module: 'BerkasKlaimClinicalLabClaim', element: <Form_7 /> },
  { path: '/modul/berkas-klaim-clinical-lab-claim/:id/edit', module: 'BerkasKlaimClinicalLabClaim', element: <Form_7 /> },
  { path: '/modul/berkas-klaim-clinical-lab-claim-item', module: 'BerkasKlaimClinicalLabClaimItem', element: <List_8 /> },
  { path: '/modul/berkas-klaim-clinical-lab-claim-item/tambah', module: 'BerkasKlaimClinicalLabClaimItem', element: <Form_8 /> },
  { path: '/modul/berkas-klaim-clinical-lab-claim-item/:id/edit', module: 'BerkasKlaimClinicalLabClaimItem', element: <Form_8 /> },
  { path: '/modul/berkas-klaim-pathology-claim', module: 'BerkasKlaimPathologyClaim', element: <List_9 /> },
  { path: '/modul/berkas-klaim-pathology-claim/tambah', module: 'BerkasKlaimPathologyClaim', element: <Form_9 /> },
  { path: '/modul/berkas-klaim-pathology-claim/:id/edit', module: 'BerkasKlaimPathologyClaim', element: <Form_9 /> },
  { path: '/modul/berkas-klaim-pathology-claim-item', module: 'BerkasKlaimPathologyClaimItem', element: <List_10 /> },
  { path: '/modul/berkas-klaim-pathology-claim-item/tambah', module: 'BerkasKlaimPathologyClaimItem', element: <Form_10 /> },
  { path: '/modul/berkas-klaim-pathology-claim-item/:id/edit', module: 'BerkasKlaimPathologyClaimItem', element: <Form_10 /> },
  { path: '/modul/berkas-klaim-pharmacy-claim', module: 'BerkasKlaimPharmacyClaim', element: <List_11 /> },
  { path: '/modul/berkas-klaim-pharmacy-claim/tambah', module: 'BerkasKlaimPharmacyClaim', element: <Form_11 /> },
  { path: '/modul/berkas-klaim-pharmacy-claim/:id/edit', module: 'BerkasKlaimPharmacyClaim', element: <Form_11 /> },
  { path: '/modul/berkas-klaim-pharmacy-claim-item', module: 'BerkasKlaimPharmacyClaimItem', element: <List_12 /> },
  { path: '/modul/berkas-klaim-pharmacy-claim-item/tambah', module: 'BerkasKlaimPharmacyClaimItem', element: <Form_12 /> },
  { path: '/modul/berkas-klaim-pharmacy-claim-item/:id/edit', module: 'BerkasKlaimPharmacyClaimItem', element: <Form_12 /> },
  { path: '/modul/berkas-klaim-radiology-claim', module: 'BerkasKlaimRadiologyClaim', element: <List_13 /> },
  { path: '/modul/berkas-klaim-radiology-claim/tambah', module: 'BerkasKlaimRadiologyClaim', element: <Form_13 /> },
  { path: '/modul/berkas-klaim-radiology-claim/:id/edit', module: 'BerkasKlaimRadiologyClaim', element: <Form_13 /> },
  { path: '/modul/berkas-klaim-radiology-claim-item', module: 'BerkasKlaimRadiologyClaimItem', element: <List_14 /> },
  { path: '/modul/berkas-klaim-radiology-claim-item/tambah', module: 'BerkasKlaimRadiologyClaimItem', element: <Form_14 /> },
  { path: '/modul/berkas-klaim-radiology-claim-item/:id/edit', module: 'BerkasKlaimRadiologyClaimItem', element: <Form_14 /> },
  { path: '/modul/berkas-klaim-supporting-document', module: 'BerkasKlaimSupportingDocument', element: <List_15 /> },
  { path: '/modul/berkas-klaim-supporting-document/tambah', module: 'BerkasKlaimSupportingDocument', element: <Form_15 /> },
  { path: '/modul/berkas-klaim-supporting-document/:id/edit', module: 'BerkasKlaimSupportingDocument', element: <Form_15 /> },
  { path: '/modul/general-absence-type', module: 'GeneralAbsenceType', element: <List_16 /> },
  { path: '/modul/general-absence-type/tambah', module: 'GeneralAbsenceType', element: <Form_16 /> },
  { path: '/modul/general-absence-type/:id/edit', module: 'GeneralAbsenceType', element: <Form_16 /> },
  { path: '/modul/general-accident-guarantor-type', module: 'GeneralAccidentGuarantorType', element: <List_17 /> },
  { path: '/modul/general-accident-guarantor-type/tambah', module: 'GeneralAccidentGuarantorType', element: <Form_17 /> },
  { path: '/modul/general-accident-guarantor-type/:id/edit', module: 'GeneralAccidentGuarantorType', element: <Form_17 /> },
  { path: '/modul/general-accommodation-calculation-rule', module: 'GeneralAccommodationCalculationRule', element: <List_18 /> },
  { path: '/modul/general-accommodation-calculation-rule/tambah', module: 'GeneralAccommodationCalculationRule', element: <Form_18 /> },
  { path: '/modul/general-accommodation-calculation-rule/:id/edit', module: 'GeneralAccommodationCalculationRule', element: <Form_18 /> },
  { path: '/modul/general-active-ingredient', module: 'GeneralActiveIngredient', element: <List_19 /> },
  { path: '/modul/general-active-ingredient/tambah', module: 'GeneralActiveIngredient', element: <Form_19 /> },
  { path: '/modul/general-active-ingredient/:id/edit', module: 'GeneralActiveIngredient', element: <Form_19 /> },
  { path: '/modul/general-administration', module: 'GeneralAdministration', element: <List_20 /> },
  { path: '/modul/general-administration/tambah', module: 'GeneralAdministration', element: <Form_20 /> },
  { path: '/modul/general-administration/:id/edit', module: 'GeneralAdministration', element: <Form_20 /> },
  { path: '/modul/general-administration-tariff', module: 'GeneralAdministrationTariff', element: <List_21 /> },
  { path: '/modul/general-administration-tariff/tambah', module: 'GeneralAdministrationTariff', element: <Form_21 /> },
  { path: '/modul/general-administration-tariff/:id/edit', module: 'GeneralAdministrationTariff', element: <Form_21 /> },
  { path: '/modul/general-admission-diagnosis', module: 'GeneralAdmissionDiagnosis', element: <List_22 /> },
  { path: '/modul/general-admission-diagnosis/tambah', module: 'GeneralAdmissionDiagnosis', element: <Form_22 /> },
  { path: '/modul/general-admission-diagnosis/:id/edit', module: 'GeneralAdmissionDiagnosis', element: <Form_22 /> },
  { path: '/modul/general-age-group', module: 'GeneralAgeGroup', element: <List_23 /> },
  { path: '/modul/general-age-group/tambah', module: 'GeneralAgeGroup', element: <Form_23 /> },
  { path: '/modul/general-age-group/:id/edit', module: 'GeneralAgeGroup', element: <Form_23 /> },
  { path: '/modul/general-ambulance-fleet', module: 'GeneralAmbulanceFleet', element: <List_24 /> },
  { path: '/modul/general-ambulance-fleet/tambah', module: 'GeneralAmbulanceFleet', element: <Form_24 /> },
  { path: '/modul/general-ambulance-fleet/:id/edit', module: 'GeneralAmbulanceFleet', element: <Form_24 /> },
  { path: '/modul/general-anatomy-template', module: 'GeneralAnatomyTemplate', element: <List_25 /> },
  { path: '/modul/general-anatomy-template/tambah', module: 'GeneralAnatomyTemplate', element: <Form_25 /> },
  { path: '/modul/general-anatomy-template/:id/edit', module: 'GeneralAnatomyTemplate', element: <Form_25 /> },
  { path: '/modul/general-anesthesia-type', module: 'GeneralAnesthesiaType', element: <List_26 /> },
  { path: '/modul/general-anesthesia-type/tambah', module: 'GeneralAnesthesiaType', element: <Form_26 /> },
  { path: '/modul/general-anesthesia-type/:id/edit', module: 'GeneralAnesthesiaType', element: <Form_26 /> },
  { path: '/modul/general-antibiotic-bacteria-mapping', module: 'GeneralAntibioticBacteriaMapping', element: <List_27 /> },
  { path: '/modul/general-antibiotic-bacteria-mapping/tambah', module: 'GeneralAntibioticBacteriaMapping', element: <Form_27 /> },
  { path: '/modul/general-antibiotic-bacteria-mapping/:id/edit', module: 'GeneralAntibioticBacteriaMapping', element: <Form_27 /> },
  { path: '/modul/general-antibiotic-restriction', module: 'GeneralAntibioticRestriction', element: <List_28 /> },
  { path: '/modul/general-antibiotic-restriction/tambah', module: 'GeneralAntibioticRestriction', element: <Form_28 /> },
  { path: '/modul/general-antibiotic-restriction/:id/edit', module: 'GeneralAntibioticRestriction', element: <Form_28 /> },
  { path: '/modul/general-audio-attachment', module: 'GeneralAudioAttachment', element: <List_29 /> },
  { path: '/modul/general-audio-attachment/tambah', module: 'GeneralAudioAttachment', element: <Form_29 /> },
  { path: '/modul/general-audio-attachment/:id/edit', module: 'GeneralAudioAttachment', element: <Form_29 /> },
  { path: '/modul/general-bank', module: 'GeneralBank', element: <List_30 /> },
  { path: '/modul/general-bank/tambah', module: 'GeneralBank', element: <Form_30 /> },
  { path: '/modul/general-bank/:id/edit', module: 'GeneralBank', element: <Form_30 /> },
  { path: '/modul/general-bank-account', module: 'GeneralBankAccount', element: <List_31 /> },
  { path: '/modul/general-bank-account/tambah', module: 'GeneralBankAccount', element: <Form_31 /> },
  { path: '/modul/general-bank-account/:id/edit', module: 'GeneralBankAccount', element: <Form_31 /> },
  { path: '/modul/general-bed', module: 'GeneralBed', element: <List_32 /> },
  { path: '/modul/general-bed/tambah', module: 'GeneralBed', element: <Form_32 /> },
  { path: '/modul/general-bed/:id/edit', module: 'GeneralBed', element: <Form_32 /> },
  { path: '/modul/general-bed-status', module: 'GeneralBedStatus', element: <List_33 /> },
  { path: '/modul/general-bed-status/tambah', module: 'GeneralBedStatus', element: <Form_33 /> },
  { path: '/modul/general-bed-status/:id/edit', module: 'GeneralBedStatus', element: <Form_33 /> },
  { path: '/modul/general-birthplace', module: 'GeneralBirthplace', element: <List_34 /> },
  { path: '/modul/general-birthplace/tambah', module: 'GeneralBirthplace', element: <Form_34 /> },
  { path: '/modul/general-birthplace/:id/edit', module: 'GeneralBirthplace', element: <Form_34 /> },
  { path: '/modul/general-bridge-type', module: 'GeneralBridgeType', element: <List_35 /> },
  { path: '/modul/general-bridge-type/tambah', module: 'GeneralBridgeType', element: <Form_35 /> },
  { path: '/modul/general-bridge-type/:id/edit', module: 'GeneralBridgeType', element: <Form_35 /> },
  { path: '/modul/general-card-type', module: 'GeneralCardType', element: <List_36 /> },
  { path: '/modul/general-card-type/tambah', module: 'GeneralCardType', element: <Form_36 /> },
  { path: '/modul/general-card-type/:id/edit', module: 'GeneralCardType', element: <Form_36 /> },
  { path: '/modul/general-consultation-room', module: 'GeneralConsultationRoom', element: <List_37 /> },
  { path: '/modul/general-consultation-room/tambah', module: 'GeneralConsultationRoom', element: <Form_37 /> },
  { path: '/modul/general-consultation-room/:id/edit', module: 'GeneralConsultationRoom', element: <Form_37 /> },
  { path: '/modul/general-contact-type', module: 'GeneralContactType', element: <List_38 /> },
  { path: '/modul/general-contact-type/tambah', module: 'GeneralContactType', element: <Form_38 /> },
  { path: '/modul/general-contact-type/:id/edit', module: 'GeneralContactType', element: <Form_38 /> },
  { path: '/modul/general-country', module: 'GeneralCountry', element: <List_39 /> },
  { path: '/modul/general-country/tambah', module: 'GeneralCountry', element: <Form_39 /> },
  { path: '/modul/general-country/:id/edit', module: 'GeneralCountry', element: <Form_39 /> },
  { path: '/modul/general-deposit-type', module: 'GeneralDepositType', element: <List_40 /> },
  { path: '/modul/general-deposit-type/tambah', module: 'GeneralDepositType', element: <Form_40 /> },
  { path: '/modul/general-deposit-type/:id/edit', module: 'GeneralDepositType', element: <Form_40 /> },
  { path: '/modul/general-diagnosis-code', module: 'GeneralDiagnosisCode', element: <List_41 /> },
  { path: '/modul/general-diagnosis-code/tambah', module: 'GeneralDiagnosisCode', element: <Form_41 /> },
  { path: '/modul/general-diagnosis-code/:id/edit', module: 'GeneralDiagnosisCode', element: <Form_41 /> },
  { path: '/modul/general-diagnosis-restriction', module: 'GeneralDiagnosisRestriction', element: <List_42 /> },
  { path: '/modul/general-diagnosis-restriction/tambah', module: 'GeneralDiagnosisRestriction', element: <Form_42 /> },
  { path: '/modul/general-diagnosis-restriction/:id/edit', module: 'GeneralDiagnosisRestriction', element: <Form_42 /> },
  { path: '/modul/general-discharge-condition', module: 'GeneralDischargeCondition', element: <List_43 /> },
  { path: '/modul/general-discharge-condition/tambah', module: 'GeneralDischargeCondition', element: <Form_43 /> },
  { path: '/modul/general-discharge-condition/:id/edit', module: 'GeneralDischargeCondition', element: <Form_43 /> },
  { path: '/modul/general-discount-type', module: 'GeneralDiscountType', element: <List_44 /> },
  { path: '/modul/general-discount-type/tambah', module: 'GeneralDiscountType', element: <Form_44 /> },
  { path: '/modul/general-discount-type/:id/edit', module: 'GeneralDiscountType', element: <Form_44 /> },
  { path: '/modul/general-doctor', module: 'GeneralDoctor', element: <List_45 /> },
  { path: '/modul/general-doctor/tambah', module: 'GeneralDoctor', element: <Form_45 /> },
  { path: '/modul/general-doctor/:id/edit', module: 'GeneralDoctor', element: <Form_45 /> },
  { path: '/modul/general-doctor-medical-department', module: 'GeneralDoctorMedicalDepartment', element: <List_46 /> },
  { path: '/modul/general-doctor-medical-department/tambah', module: 'GeneralDoctorMedicalDepartment', element: <Form_46 /> },
  { path: '/modul/general-doctor-medical-department/:id/edit', module: 'GeneralDoctorMedicalDepartment', element: <Form_46 /> },
  { path: '/modul/general-doctor-ward-assignment', module: 'GeneralDoctorWardAssignment', element: <List_47 /> },
  { path: '/modul/general-doctor-ward-assignment/tambah', module: 'GeneralDoctorWardAssignment', element: <Form_47 /> },
  { path: '/modul/general-doctor-ward-assignment/:id/edit', module: 'GeneralDoctorWardAssignment', element: <Form_47 /> },
  { path: '/modul/general-dosage-instruction', module: 'GeneralDosageInstruction', element: <List_48 /> },
  { path: '/modul/general-dosage-instruction/tambah', module: 'GeneralDosageInstruction', element: <Form_48 /> },
  { path: '/modul/general-dosage-instruction/:id/edit', module: 'GeneralDosageInstruction', element: <Form_48 /> },
  { path: '/modul/general-duration-restriction', module: 'GeneralDurationRestriction', element: <List_49 /> },
  { path: '/modul/general-duration-restriction/tambah', module: 'GeneralDurationRestriction', element: <Form_49 /> },
  { path: '/modul/general-duration-restriction/:id/edit', module: 'GeneralDurationRestriction', element: <Form_49 /> },
  { path: '/modul/general-education', module: 'GeneralEducation', element: <List_50 /> },
  { path: '/modul/general-education/tambah', module: 'GeneralEducation', element: <Form_50 /> },
  { path: '/modul/general-education/:id/edit', module: 'GeneralEducation', element: <Form_50 /> },
  { path: '/modul/general-employee', module: 'GeneralEmployee', element: <List_51 /> },
  { path: '/modul/general-employee/tambah', module: 'GeneralEmployee', element: <Form_51 /> },
  { path: '/modul/general-employee/:id/edit', module: 'GeneralEmployee', element: <Form_51 /> },
  { path: '/modul/general-employee-photo', module: 'GeneralEmployeePhoto', element: <List_52 /> },
  { path: '/modul/general-employee-photo/tambah', module: 'GeneralEmployeePhoto', element: <Form_52 /> },
  { path: '/modul/general-employee-photo/:id/edit', module: 'GeneralEmployeePhoto', element: <Form_52 /> },
  { path: '/modul/general-employee-status', module: 'GeneralEmployeeStatus', element: <List_53 /> },
  { path: '/modul/general-employee-status/tambah', module: 'GeneralEmployeeStatus', element: <Form_53 /> },
  { path: '/modul/general-employee-status/:id/edit', module: 'GeneralEmployeeStatus', element: <Form_53 /> },
  { path: '/modul/general-employment-status', module: 'GeneralEmploymentStatus', element: <List_54 /> },
  { path: '/modul/general-employment-status/tambah', module: 'GeneralEmploymentStatus', element: <Form_54 /> },
  { path: '/modul/general-employment-status/:id/edit', module: 'GeneralEmploymentStatus', element: <Form_54 /> },
  { path: '/modul/general-ethnicity', module: 'GeneralEthnicity', element: <List_55 /> },
  { path: '/modul/general-ethnicity/tambah', module: 'GeneralEthnicity', element: <Form_55 /> },
  { path: '/modul/general-ethnicity/:id/edit', module: 'GeneralEthnicity', element: <Form_55 /> },
  { path: '/modul/general-examination-group', module: 'GeneralExaminationGroup', element: <List_56 /> },
  { path: '/modul/general-examination-group/tambah', module: 'GeneralExaminationGroup', element: <Form_56 /> },
  { path: '/modul/general-examination-group/:id/edit', module: 'GeneralExaminationGroup', element: <Form_56 /> },
  { path: '/modul/general-examination-group-mapping', module: 'GeneralExaminationGroupMapping', element: <List_57 /> },
  { path: '/modul/general-examination-group-mapping/tambah', module: 'GeneralExaminationGroupMapping', element: <Form_57 /> },
  { path: '/modul/general-examination-group-mapping/:id/edit', module: 'GeneralExaminationGroupMapping', element: <Form_57 /> },
  { path: '/modul/general-facility-maintenance', module: 'GeneralFacilityMaintenance', element: <List_58 /> },
  { path: '/modul/general-facility-maintenance/tambah', module: 'GeneralFacilityMaintenance', element: <Form_58 /> },
  { path: '/modul/general-facility-maintenance/:id/edit', module: 'GeneralFacilityMaintenance', element: <Form_58 /> },
  { path: '/modul/general-facility-ownership-type', module: 'GeneralFacilityOwnershipType', element: <List_59 /> },
  { path: '/modul/general-facility-ownership-type/tambah', module: 'GeneralFacilityOwnershipType', element: <Form_59 /> },
  { path: '/modul/general-facility-ownership-type/:id/edit', module: 'GeneralFacilityOwnershipType', element: <Form_59 /> },
  { path: '/modul/general-family-relationship', module: 'GeneralFamilyRelationship', element: <List_60 /> },
  { path: '/modul/general-family-relationship/tambah', module: 'GeneralFamilyRelationship', element: <Form_60 /> },
  { path: '/modul/general-family-relationship/:id/edit', module: 'GeneralFamilyRelationship', element: <Form_60 /> },
  { path: '/modul/general-flow', module: 'GeneralFlow', element: <List_61 /> },
  { path: '/modul/general-flow/tambah', module: 'GeneralFlow', element: <Form_61 /> },
  { path: '/modul/general-flow/:id/edit', module: 'GeneralFlow', element: <Form_61 /> },
  { path: '/modul/general-formulary-restriction', module: 'GeneralFormularyRestriction', element: <List_62 /> },
  { path: '/modul/general-formulary-restriction/tambah', module: 'GeneralFormularyRestriction', element: <Form_62 /> },
  { path: '/modul/general-formulary-restriction/:id/edit', module: 'GeneralFormularyRestriction', element: <Form_62 /> },
  { path: '/modul/general-gender', module: 'GeneralGender', element: <List_63 /> },
  { path: '/modul/general-gender/tambah', module: 'GeneralGender', element: <Form_63 /> },
  { path: '/modul/general-gender/:id/edit', module: 'GeneralGender', element: <Form_63 /> },
  { path: '/modul/general-goods-receipt-cancellation-reason', module: 'GeneralGoodsReceiptCancellationReason', element: <List_64 /> },
  { path: '/modul/general-goods-receipt-cancellation-reason/tambah', module: 'GeneralGoodsReceiptCancellationReason', element: <Form_64 /> },
  { path: '/modul/general-goods-receipt-cancellation-reason/:id/edit', module: 'GeneralGoodsReceiptCancellationReason', element: <Form_64 /> },
  { path: '/modul/general-goods-receipt-type', module: 'GeneralGoodsReceiptType', element: <List_65 /> },
  { path: '/modul/general-goods-receipt-type/tambah', module: 'GeneralGoodsReceiptType', element: <Form_65 /> },
  { path: '/modul/general-goods-receipt-type/:id/edit', module: 'GeneralGoodsReceiptType', element: <Form_65 /> },
  { path: '/modul/general-guarantor-item-category-mapping', module: 'GeneralGuarantorItemCategoryMapping', element: <List_66 /> },
  { path: '/modul/general-guarantor-item-category-mapping/tambah', module: 'GeneralGuarantorItemCategoryMapping', element: <Form_66 /> },
  { path: '/modul/general-guarantor-item-category-mapping/:id/edit', module: 'GeneralGuarantorItemCategoryMapping', element: <Form_66 /> },
  { path: '/modul/general-guarantor-participant-type', module: 'GeneralGuarantorParticipantType', element: <List_67 /> },
  { path: '/modul/general-guarantor-participant-type/tambah', module: 'GeneralGuarantorParticipantType', element: <Form_67 /> },
  { path: '/modul/general-guarantor-participant-type/:id/edit', module: 'GeneralGuarantorParticipantType', element: <Form_67 /> },
  { path: '/modul/general-guarantor-subspecialty', module: 'GeneralGuarantorSubspecialty', element: <List_68 /> },
  { path: '/modul/general-guarantor-subspecialty/tambah', module: 'GeneralGuarantorSubspecialty', element: <Form_68 /> },
  { path: '/modul/general-guarantor-subspecialty/:id/edit', module: 'GeneralGuarantorSubspecialty', element: <Form_68 /> },
  { path: '/modul/general-guarantor-ward-access', module: 'GeneralGuarantorWardAccess', element: <List_69 /> },
  { path: '/modul/general-guarantor-ward-access/tambah', module: 'GeneralGuarantorWardAccess', element: <Form_69 /> },
  { path: '/modul/general-guarantor-ward-access/:id/edit', module: 'GeneralGuarantorWardAccess', element: <Form_69 /> },
  { path: '/modul/general-health-provider-type', module: 'GeneralHealthProviderType', element: <List_70 /> },
  { path: '/modul/general-health-provider-type/tambah', module: 'GeneralHealthProviderType', element: <Form_70 /> },
  { path: '/modul/general-health-provider-type/:id/edit', module: 'GeneralHealthProviderType', element: <Form_70 /> },
  { path: '/modul/general-healthcare-service-type', module: 'GeneralHealthcareServiceType', element: <List_71 /> },
  { path: '/modul/general-healthcare-service-type/tambah', module: 'GeneralHealthcareServiceType', element: <Form_71 /> },
  { path: '/modul/general-healthcare-service-type/:id/edit', module: 'GeneralHealthcareServiceType', element: <Form_71 /> },
  { path: '/modul/general-icd-omorphology', module: 'GeneralIcdOMorphology', element: <List_72 /> },
  { path: '/modul/general-icd-omorphology/tambah', module: 'GeneralIcdOMorphology', element: <Form_72 /> },
  { path: '/modul/general-icd-omorphology/:id/edit', module: 'GeneralIcdOMorphology', element: <Form_72 /> },
  { path: '/modul/general-icd-otopography', module: 'GeneralIcdOTopography', element: <List_73 /> },
  { path: '/modul/general-icd-otopography/tambah', module: 'GeneralIcdOTopography', element: <Form_73 /> },
  { path: '/modul/general-icd-otopography/:id/edit', module: 'GeneralIcdOTopography', element: <Form_73 /> },
  { path: '/modul/general-icd-snomed-ct-mapping', module: 'GeneralIcdSnomedCtMapping', element: <List_74 /> },
  { path: '/modul/general-icd-snomed-ct-mapping/tambah', module: 'GeneralIcdSnomedCtMapping', element: <Form_74 /> },
  { path: '/modul/general-icd-snomed-ct-mapping/:id/edit', module: 'GeneralIcdSnomedCtMapping', element: <Form_74 /> },
  { path: '/modul/general-icd-type', module: 'GeneralIcdType', element: <List_75 /> },
  { path: '/modul/general-icd-type/tambah', module: 'GeneralIcdType', element: <Form_75 /> },
  { path: '/modul/general-icd-type/:id/edit', module: 'GeneralIcdType', element: <Form_75 /> },
  { path: '/modul/general-identity-card-type', module: 'GeneralIdentityCardType', element: <List_76 /> },
  { path: '/modul/general-identity-card-type/tambah', module: 'GeneralIdentityCardType', element: <Form_76 /> },
  { path: '/modul/general-identity-card-type/:id/edit', module: 'GeneralIdentityCardType', element: <Form_76 /> },
  { path: '/modul/general-inpatient-type', module: 'GeneralInpatientType', element: <List_77 /> },
  { path: '/modul/general-inpatient-type/tambah', module: 'GeneralInpatientType', element: <Form_77 /> },
  { path: '/modul/general-inpatient-type/:id/edit', module: 'GeneralInpatientType', element: <Form_77 /> },
  { path: '/modul/general-institution', module: 'GeneralInstitution', element: <List_78 /> },
  { path: '/modul/general-institution/tambah', module: 'GeneralInstitution', element: <Form_78 /> },
  { path: '/modul/general-institution/:id/edit', module: 'GeneralInstitution', element: <Form_78 /> },
  { path: '/modul/general-insurance-card-type', module: 'GeneralInsuranceCardType', element: <List_79 /> },
  { path: '/modul/general-insurance-card-type/tambah', module: 'GeneralInsuranceCardType', element: <Form_79 /> },
  { path: '/modul/general-insurance-card-type/:id/edit', module: 'GeneralInsuranceCardType', element: <Form_79 /> },
  { path: '/modul/general-invoice-type', module: 'GeneralInvoiceType', element: <List_80 /> },
  { path: '/modul/general-invoice-type/tambah', module: 'GeneralInvoiceType', element: <Form_80 /> },
  { path: '/modul/general-invoice-type/:id/edit', module: 'GeneralInvoiceType', element: <Form_80 /> },
  { path: '/modul/general-kap', module: 'GeneralKap', element: <List_81 /> },
  { path: '/modul/general-kap/tambah', module: 'GeneralKap', element: <Form_81 /> },
  { path: '/modul/general-kap/:id/edit', module: 'GeneralKap', element: <Form_81 /> },
  { path: '/modul/general-kip', module: 'GeneralKip', element: <List_82 /> },
  { path: '/modul/general-kip/tambah', module: 'GeneralKip', element: <Form_82 /> },
  { path: '/modul/general-kip/:id/edit', module: 'GeneralKip', element: <Form_82 /> },
  { path: '/modul/general-lab-group', module: 'GeneralLabGroup', element: <List_83 /> },
  { path: '/modul/general-lab-group/tambah', module: 'GeneralLabGroup', element: <Form_83 /> },
  { path: '/modul/general-lab-group/:id/edit', module: 'GeneralLabGroup', element: <Form_83 /> },
  { path: '/modul/general-lab-reference-value', module: 'GeneralLabReferenceValue', element: <List_84 /> },
  { path: '/modul/general-lab-reference-value/tambah', module: 'GeneralLabReferenceValue', element: <Form_84 /> },
  { path: '/modul/general-lab-reference-value/:id/edit', module: 'GeneralLabReferenceValue', element: <Form_84 /> },
  { path: '/modul/general-lab-service-group', module: 'GeneralLabServiceGroup', element: <List_85 /> },
  { path: '/modul/general-lab-service-group/tambah', module: 'GeneralLabServiceGroup', element: <Form_85 /> },
  { path: '/modul/general-lab-service-group/:id/edit', module: 'GeneralLabServiceGroup', element: <Form_85 /> },
  { path: '/modul/general-lab-service-parameter', module: 'GeneralLabServiceParameter', element: <List_86 /> },
  { path: '/modul/general-lab-service-parameter/tambah', module: 'GeneralLabServiceParameter', element: <Form_86 /> },
  { path: '/modul/general-lab-service-parameter/:id/edit', module: 'GeneralLabServiceParameter', element: <Form_86 /> },
  { path: '/modul/general-laboratory-room', module: 'GeneralLaboratoryRoom', element: <List_87 /> },
  { path: '/modul/general-laboratory-room/tambah', module: 'GeneralLaboratoryRoom', element: <Form_87 /> },
  { path: '/modul/general-laboratory-room/:id/edit', module: 'GeneralLaboratoryRoom', element: <Form_87 /> },
  { path: '/modul/general-laboratory-unit', module: 'GeneralLaboratoryUnit', element: <List_88 /> },
  { path: '/modul/general-laboratory-unit/tambah', module: 'GeneralLaboratoryUnit', element: <Form_88 /> },
  { path: '/modul/general-laboratory-unit/:id/edit', module: 'GeneralLaboratoryUnit', element: <Form_88 /> },
  { path: '/modul/general-language', module: 'GeneralLanguage', element: <List_89 /> },
  { path: '/modul/general-language/tambah', module: 'GeneralLanguage', element: <Form_89 /> },
  { path: '/modul/general-language/:id/edit', module: 'GeneralLanguage', element: <Form_89 /> },
  { path: '/modul/general-manufacturer', module: 'GeneralManufacturer', element: <List_90 /> },
  { path: '/modul/general-manufacturer/tambah', module: 'GeneralManufacturer', element: <Form_90 /> },
  { path: '/modul/general-manufacturer/:id/edit', module: 'GeneralManufacturer', element: <Form_90 /> },
  { path: '/modul/general-marital-status', module: 'GeneralMaritalStatus', element: <List_91 /> },
  { path: '/modul/general-marital-status/tambah', module: 'GeneralMaritalStatus', element: <Form_91 /> },
  { path: '/modul/general-marital-status/:id/edit', module: 'GeneralMaritalStatus', element: <Form_91 /> },
  { path: '/modul/general-medical-department', module: 'GeneralMedicalDepartment', element: <List_92 /> },
  { path: '/modul/general-medical-department/tambah', module: 'GeneralMedicalDepartment', element: <Form_92 /> },
  { path: '/modul/general-medical-department/:id/edit', module: 'GeneralMedicalDepartment', element: <Form_92 /> },
  { path: '/modul/general-medical-department-ward-assignment', module: 'GeneralMedicalDepartmentWardAssignment', element: <List_93 /> },
  { path: '/modul/general-medical-department-ward-assignment/tambah', module: 'GeneralMedicalDepartmentWardAssignment', element: <Form_93 /> },
  { path: '/modul/general-medical-department-ward-assignment/:id/edit', module: 'GeneralMedicalDepartmentWardAssignment', element: <Form_93 /> },
  { path: '/modul/general-medical-personnel', module: 'GeneralMedicalPersonnel', element: <List_94 /> },
  { path: '/modul/general-medical-personnel/tambah', module: 'GeneralMedicalPersonnel', element: <Form_94 /> },
  { path: '/modul/general-medical-personnel/:id/edit', module: 'GeneralMedicalPersonnel', element: <Form_94 /> },
  { path: '/modul/general-medical-personnel-type', module: 'GeneralMedicalPersonnelType', element: <List_95 /> },
  { path: '/modul/general-medical-personnel-type/tambah', module: 'GeneralMedicalPersonnelType', element: <Form_95 /> },
  { path: '/modul/general-medical-personnel-type/:id/edit', module: 'GeneralMedicalPersonnelType', element: <Form_95 /> },
  { path: '/modul/general-medication-administration-type', module: 'GeneralMedicationAdministrationType', element: <List_96 /> },
  { path: '/modul/general-medication-administration-type/tambah', module: 'GeneralMedicationAdministrationType', element: <Form_96 /> },
  { path: '/modul/general-medication-administration-type/:id/edit', module: 'GeneralMedicationAdministrationType', element: <Form_96 /> },
  { path: '/modul/general-medication-usage-type', module: 'GeneralMedicationUsageType', element: <List_97 /> },
  { path: '/modul/general-medication-usage-type/tambah', module: 'GeneralMedicationUsageType', element: <Form_97 /> },
  { path: '/modul/general-medication-usage-type/:id/edit', module: 'GeneralMedicationUsageType', element: <Form_97 /> },
  { path: '/modul/general-mixture-instruction', module: 'GeneralMixtureInstruction', element: <List_98 /> },
  { path: '/modul/general-mixture-instruction/tambah', module: 'GeneralMixtureInstruction', element: <Form_98 /> },
  { path: '/modul/general-mixture-instruction/:id/edit', module: 'GeneralMixtureInstruction', element: <Form_98 /> },
  { path: '/modul/general-mixture-packaging-type', module: 'GeneralMixturePackagingType', element: <List_99 /> },
  { path: '/modul/general-mixture-packaging-type/tambah', module: 'GeneralMixturePackagingType', element: <Form_99 /> },
  { path: '/modul/general-mixture-packaging-type/:id/edit', module: 'GeneralMixturePackagingType', element: <Form_99 /> },
  { path: '/modul/general-mixture-type', module: 'GeneralMixtureType', element: <List_100 /> },
  { path: '/modul/general-mixture-type/tambah', module: 'GeneralMixtureType', element: <Form_100 /> },
  { path: '/modul/general-mixture-type/:id/edit', module: 'GeneralMixtureType', element: <Form_100 /> },
  { path: '/modul/general-month-name', module: 'GeneralMonthName', element: <List_101 /> },
  { path: '/modul/general-month-name/tambah', module: 'GeneralMonthName', element: <Form_101 /> },
  { path: '/modul/general-month-name/:id/edit', module: 'GeneralMonthName', element: <Form_101 /> },
  { path: '/modul/general-nurse', module: 'GeneralNurse', element: <List_102 /> },
  { path: '/modul/general-nurse/tambah', module: 'GeneralNurse', element: <Form_102 /> },
  { path: '/modul/general-nurse/:id/edit', module: 'GeneralNurse', element: <Form_102 /> },
  { path: '/modul/general-nurse-ward-assignment', module: 'GeneralNurseWardAssignment', element: <List_103 /> },
  { path: '/modul/general-nurse-ward-assignment/tambah', module: 'GeneralNurseWardAssignment', element: <Form_103 /> },
  { path: '/modul/general-nurse-ward-assignment/:id/edit', module: 'GeneralNurseWardAssignment', element: <Form_103 /> },
  { path: '/modul/general-occupation', module: 'GeneralOccupation', element: <List_104 /> },
  { path: '/modul/general-occupation/tambah', module: 'GeneralOccupation', element: <Form_104 /> },
  { path: '/modul/general-occupation/:id/edit', module: 'GeneralOccupation', element: <Form_104 /> },
  { path: '/modul/general-operating-room', module: 'GeneralOperatingRoom', element: <List_105 /> },
  { path: '/modul/general-operating-room/tambah', module: 'GeneralOperatingRoom', element: <Form_105 /> },
  { path: '/modul/general-operating-room/:id/edit', module: 'GeneralOperatingRoom', element: <Form_105 /> },
  { path: '/modul/general-operation-class', module: 'GeneralOperationClass', element: <List_106 /> },
  { path: '/modul/general-operation-class/tambah', module: 'GeneralOperationClass', element: <Form_106 /> },
  { path: '/modul/general-operation-class/:id/edit', module: 'GeneralOperationClass', element: <Form_106 /> },
  { path: '/modul/general-operation-group', module: 'GeneralOperationGroup', element: <List_107 /> },
  { path: '/modul/general-operation-group/tambah', module: 'GeneralOperationGroup', element: <Form_107 /> },
  { path: '/modul/general-operation-group/:id/edit', module: 'GeneralOperationGroup', element: <Form_107 /> },
  { path: '/modul/general-operation-type', module: 'GeneralOperationType', element: <List_108 /> },
  { path: '/modul/general-operation-type/tambah', module: 'GeneralOperationType', element: <Form_108 /> },
  { path: '/modul/general-operation-type/:id/edit', module: 'GeneralOperationType', element: <Form_108 /> },
  { path: '/modul/general-other-service', module: 'GeneralOtherService', element: <List_109 /> },
  { path: '/modul/general-other-service/tambah', module: 'GeneralOtherService', element: <Form_109 /> },
  { path: '/modul/general-other-service/:id/edit', module: 'GeneralOtherService', element: <Form_109 /> },
  { path: '/modul/general-other-service-tariff', module: 'GeneralOtherServiceTariff', element: <List_110 /> },
  { path: '/modul/general-other-service-tariff/tambah', module: 'GeneralOtherServiceTariff', element: <Form_110 /> },
  { path: '/modul/general-other-service-tariff/:id/edit', module: 'GeneralOtherServiceTariff', element: <Form_110 /> },
  { path: '/modul/general-other-status', module: 'GeneralOtherStatus', element: <List_111 /> },
  { path: '/modul/general-other-status/tambah', module: 'GeneralOtherStatus', element: <Form_111 /> },
  { path: '/modul/general-other-status/:id/edit', module: 'GeneralOtherStatus', element: <Form_111 /> },
  { path: '/modul/general-oxygen-tariff', module: 'GeneralOxygenTariff', element: <List_112 /> },
  { path: '/modul/general-oxygen-tariff/tambah', module: 'GeneralOxygenTariff', element: <Form_112 /> },
  { path: '/modul/general-oxygen-tariff/:id/edit', module: 'GeneralOxygenTariff', element: <Form_112 /> },
  { path: '/modul/general-package', module: 'GeneralPackage', element: <List_113 /> },
  { path: '/modul/general-package/tambah', module: 'GeneralPackage', element: <Form_113 /> },
  { path: '/modul/general-package/:id/edit', module: 'GeneralPackage', element: <Form_113 /> },
  { path: '/modul/general-package-item', module: 'GeneralPackageItem', element: <List_114 /> },
  { path: '/modul/general-package-item/tambah', module: 'GeneralPackageItem', element: <Form_114 /> },
  { path: '/modul/general-package-item/:id/edit', module: 'GeneralPackageItem', element: <Form_114 /> },
  { path: '/modul/general-package-item-type', module: 'GeneralPackageItemType', element: <List_115 /> },
  { path: '/modul/general-package-item-type/tambah', module: 'GeneralPackageItemType', element: <Form_115 /> },
  { path: '/modul/general-package-item-type/:id/edit', module: 'GeneralPackageItemType', element: <Form_115 /> },
  { path: '/modul/general-package-service', module: 'GeneralPackageService', element: <List_116 /> },
  { path: '/modul/general-package-service/tambah', module: 'GeneralPackageService', element: <Form_116 /> },
  { path: '/modul/general-package-service/:id/edit', module: 'GeneralPackageService', element: <Form_116 /> },
  { path: '/modul/general-package-tariff-distribution', module: 'GeneralPackageTariffDistribution', element: <List_117 /> },
  { path: '/modul/general-package-tariff-distribution/tambah', module: 'GeneralPackageTariffDistribution', element: <Form_117 /> },
  { path: '/modul/general-package-tariff-distribution/:id/edit', module: 'GeneralPackageTariffDistribution', element: <Form_117 /> },
  { path: '/modul/general-package-tariff-distribution-item', module: 'GeneralPackageTariffDistributionItem', element: <List_118 /> },
  { path: '/modul/general-package-tariff-distribution-item/tambah', module: 'GeneralPackageTariffDistributionItem', element: <Form_118 /> },
  { path: '/modul/general-package-tariff-distribution-item/:id/edit', module: 'GeneralPackageTariffDistributionItem', element: <Form_118 /> },
  { path: '/modul/general-pain-onset-type', module: 'GeneralPainOnsetType', element: <List_119 /> },
  { path: '/modul/general-pain-onset-type/tambah', module: 'GeneralPainOnsetType', element: <Form_119 /> },
  { path: '/modul/general-pain-onset-type/:id/edit', module: 'GeneralPainOnsetType', element: <Form_119 /> },
  { path: '/modul/general-pain-scale-method', module: 'GeneralPainScaleMethod', element: <List_120 /> },
  { path: '/modul/general-pain-scale-method/tambah', module: 'GeneralPainScaleMethod', element: <Form_120 /> },
  { path: '/modul/general-pain-scale-method/:id/edit', module: 'GeneralPainScaleMethod', element: <Form_120 /> },
  { path: '/modul/general-pathology-examination-type', module: 'GeneralPathologyExaminationType', element: <List_121 /> },
  { path: '/modul/general-pathology-examination-type/tambah', module: 'GeneralPathologyExaminationType', element: <Form_121 /> },
  { path: '/modul/general-pathology-examination-type/:id/edit', module: 'GeneralPathologyExaminationType', element: <Form_121 /> },
  { path: '/modul/general-patient', module: 'GeneralPatient', element: <List_122 /> },
  { path: '/modul/general-patient/tambah', module: 'GeneralPatient', element: <Form_122 /> },
  { path: '/modul/general-patient/:id/edit', module: 'GeneralPatient', element: <Form_122 /> },
  { path: '/modul/general-patient-access-lock', module: 'GeneralPatientAccessLock', element: <List_123 /> },
  { path: '/modul/general-patient-access-lock/tambah', module: 'GeneralPatientAccessLock', element: <Form_123 /> },
  { path: '/modul/general-patient-access-lock/:id/edit', module: 'GeneralPatientAccessLock', element: <Form_123 /> },
  { path: '/modul/general-patient-contact', module: 'GeneralPatientContact', element: <List_124 /> },
  { path: '/modul/general-patient-contact/tambah', module: 'GeneralPatientContact', element: <Form_124 /> },
  { path: '/modul/general-patient-contact/:id/edit', module: 'GeneralPatientContact', element: <Form_124 /> },
  { path: '/modul/general-patient-family', module: 'GeneralPatientFamily', element: <List_125 /> },
  { path: '/modul/general-patient-family/tambah', module: 'GeneralPatientFamily', element: <Form_125 /> },
  { path: '/modul/general-patient-family/:id/edit', module: 'GeneralPatientFamily', element: <Form_125 /> },
  { path: '/modul/general-patient-family-contact', module: 'GeneralPatientFamilyContact', element: <List_126 /> },
  { path: '/modul/general-patient-family-contact/tambah', module: 'GeneralPatientFamilyContact', element: <Form_126 /> },
  { path: '/modul/general-patient-family-contact/:id/edit', module: 'GeneralPatientFamilyContact', element: <Form_126 /> },
  { path: '/modul/general-patient-family-identity-card', module: 'GeneralPatientFamilyIdentityCard', element: <List_127 /> },
  { path: '/modul/general-patient-family-identity-card/tambah', module: 'GeneralPatientFamilyIdentityCard', element: <Form_127 /> },
  { path: '/modul/general-patient-family-identity-card/:id/edit', module: 'GeneralPatientFamilyIdentityCard', element: <Form_127 /> },
  { path: '/modul/general-patient-photo', module: 'GeneralPatientPhoto', element: <List_128 /> },
  { path: '/modul/general-patient-photo/tambah', module: 'GeneralPatientPhoto', element: <Form_128 /> },
  { path: '/modul/general-patient-photo/:id/edit', module: 'GeneralPatientPhoto', element: <Form_128 /> },
  { path: '/modul/general-patient-pickup-status', module: 'GeneralPatientPickupStatus', element: <List_129 /> },
  { path: '/modul/general-patient-pickup-status/tambah', module: 'GeneralPatientPickupStatus', element: <Form_129 /> },
  { path: '/modul/general-patient-pickup-status/:id/edit', module: 'GeneralPatientPickupStatus', element: <Form_129 /> },
  { path: '/modul/general-patient-status', module: 'GeneralPatientStatus', element: <List_130 /> },
  { path: '/modul/general-patient-status/tambah', module: 'GeneralPatientStatus', element: <Form_130 /> },
  { path: '/modul/general-patient-status/:id/edit', module: 'GeneralPatientStatus', element: <Form_130 /> },
  { path: '/modul/general-patient-type', module: 'GeneralPatientType', element: <List_131 /> },
  { path: '/modul/general-patient-type/tambah', module: 'GeneralPatientType', element: <Form_131 /> },
  { path: '/modul/general-patient-type/:id/edit', module: 'GeneralPatientType', element: <Form_131 /> },
  { path: '/modul/general-payment-transaction-type', module: 'GeneralPaymentTransactionType', element: <List_132 /> },
  { path: '/modul/general-payment-transaction-type/tambah', module: 'GeneralPaymentTransactionType', element: <Form_132 /> },
  { path: '/modul/general-payment-transaction-type/:id/edit', module: 'GeneralPaymentTransactionType', element: <Form_132 /> },
  { path: '/modul/general-payment-type', module: 'GeneralPaymentType', element: <List_133 /> },
  { path: '/modul/general-payment-type/tambah', module: 'GeneralPaymentType', element: <Form_133 /> },
  { path: '/modul/general-payment-type/:id/edit', module: 'GeneralPaymentType', element: <Form_133 /> },
  { path: '/modul/general-payroll-addition', module: 'GeneralPayrollAddition', element: <List_134 /> },
  { path: '/modul/general-payroll-addition/tambah', module: 'GeneralPayrollAddition', element: <Form_134 /> },
  { path: '/modul/general-payroll-addition/:id/edit', module: 'GeneralPayrollAddition', element: <Form_134 /> },
  { path: '/modul/general-payroll-deduction', module: 'GeneralPayrollDeduction', element: <List_135 /> },
  { path: '/modul/general-payroll-deduction/tambah', module: 'GeneralPayrollDeduction', element: <Form_135 /> },
  { path: '/modul/general-payroll-deduction/:id/edit', module: 'GeneralPayrollDeduction', element: <Form_135 /> },
  { path: '/modul/general-pharmacy-depot', module: 'GeneralPharmacyDepot', element: <List_136 /> },
  { path: '/modul/general-pharmacy-depot/tambah', module: 'GeneralPharmacyDepot', element: <Form_136 /> },
  { path: '/modul/general-pharmacy-depot/:id/edit', module: 'GeneralPharmacyDepot', element: <Form_136 /> },
  { path: '/modul/general-pharmacy-guarantor-margin', module: 'GeneralPharmacyGuarantorMargin', element: <List_137 /> },
  { path: '/modul/general-pharmacy-guarantor-margin/tambah', module: 'GeneralPharmacyGuarantorMargin', element: <Form_137 /> },
  { path: '/modul/general-pharmacy-guarantor-margin/:id/edit', module: 'GeneralPharmacyGuarantorMargin', element: <Form_137 /> },
  { path: '/modul/general-pharmacy-room', module: 'GeneralPharmacyRoom', element: <List_138 /> },
  { path: '/modul/general-pharmacy-room/tambah', module: 'GeneralPharmacyRoom', element: <Form_138 /> },
  { path: '/modul/general-pharmacy-room/:id/edit', module: 'GeneralPharmacyRoom', element: <Form_138 /> },
  { path: '/modul/general-pharmacy-service-room', module: 'GeneralPharmacyServiceRoom', element: <List_139 /> },
  { path: '/modul/general-pharmacy-service-room/tambah', module: 'GeneralPharmacyServiceRoom', element: <Form_139 /> },
  { path: '/modul/general-pharmacy-service-room/:id/edit', module: 'GeneralPharmacyServiceRoom', element: <Form_139 /> },
  { path: '/modul/general-pharmacy-status-type', module: 'GeneralPharmacyStatusType', element: <List_140 /> },
  { path: '/modul/general-pharmacy-status-type/tambah', module: 'GeneralPharmacyStatusType', element: <Form_140 /> },
  { path: '/modul/general-pharmacy-status-type/:id/edit', module: 'GeneralPharmacyStatusType', element: <Form_140 /> },
  { path: '/modul/general-pharmacy-tariff-by-room-class', module: 'GeneralPharmacyTariffByRoomClass', element: <List_141 /> },
  { path: '/modul/general-pharmacy-tariff-by-room-class/tambah', module: 'GeneralPharmacyTariffByRoomClass', element: <Form_141 /> },
  { path: '/modul/general-pharmacy-tariff-by-room-class/:id/edit', module: 'GeneralPharmacyTariffByRoomClass', element: <Form_141 /> },
  { path: '/modul/general-physician-restriction', module: 'GeneralPhysicianRestriction', element: <List_142 /> },
  { path: '/modul/general-physician-restriction/tambah', module: 'GeneralPhysicianRestriction', element: <Form_142 /> },
  { path: '/modul/general-physician-restriction/:id/edit', module: 'GeneralPhysicianRestriction', element: <Form_142 /> },
  { path: '/modul/general-planning-period', module: 'GeneralPlanningPeriod', element: <List_143 /> },
  { path: '/modul/general-planning-period/tambah', module: 'GeneralPlanningPeriod', element: <Form_143 /> },
  { path: '/modul/general-planning-period/:id/edit', module: 'GeneralPlanningPeriod', element: <Form_143 /> },
  { path: '/modul/general-position-title', module: 'GeneralPositionTitle', element: <List_144 /> },
  { path: '/modul/general-position-title/tambah', module: 'GeneralPositionTitle', element: <Form_144 /> },
  { path: '/modul/general-position-title/:id/edit', module: 'GeneralPositionTitle', element: <Form_144 /> },
  { path: '/modul/general-ppk', module: 'GeneralPpk', element: <List_145 /> },
  { path: '/modul/general-ppk/tambah', module: 'GeneralPpk', element: <Form_145 /> },
  { path: '/modul/general-ppk/:id/edit', module: 'GeneralPpk', element: <Form_145 /> },
  { path: '/modul/general-prescription-frequency-rule', module: 'GeneralPrescriptionFrequencyRule', element: <List_146 /> },
  { path: '/modul/general-prescription-frequency-rule/tambah', module: 'GeneralPrescriptionFrequencyRule', element: <Form_146 /> },
  { path: '/modul/general-prescription-frequency-rule/:id/edit', module: 'GeneralPrescriptionFrequencyRule', element: <Form_146 /> },
  { path: '/modul/general-prescription-frequency-rule-category', module: 'GeneralPrescriptionFrequencyRuleCategory', element: <List_147 /> },
  { path: '/modul/general-prescription-frequency-rule-category/tambah', module: 'GeneralPrescriptionFrequencyRuleCategory', element: <Form_147 /> },
  { path: '/modul/general-prescription-frequency-rule-category/:id/edit', module: 'GeneralPrescriptionFrequencyRuleCategory', element: <Form_147 /> },
  { path: '/modul/general-prescription-origin-unit-restriction', module: 'GeneralPrescriptionOriginUnitRestriction', element: <List_148 /> },
  { path: '/modul/general-prescription-origin-unit-restriction/tambah', module: 'GeneralPrescriptionOriginUnitRestriction', element: <Form_148 /> },
  { path: '/modul/general-prescription-origin-unit-restriction/:id/edit', module: 'GeneralPrescriptionOriginUnitRestriction', element: <Form_148 /> },
  { path: '/modul/general-prescription-type', module: 'GeneralPrescriptionType', element: <List_149 /> },
  { path: '/modul/general-prescription-type/tambah', module: 'GeneralPrescriptionType', element: <Form_149 /> },
  { path: '/modul/general-prescription-type/:id/edit', module: 'GeneralPrescriptionType', element: <Form_149 /> },
  { path: '/modul/general-print-type', module: 'GeneralPrintType', element: <List_150 /> },
  { path: '/modul/general-print-type/tambah', module: 'GeneralPrintType', element: <Form_150 /> },
  { path: '/modul/general-print-type/:id/edit', module: 'GeneralPrintType', element: <Form_150 /> },
  { path: '/modul/general-procedure', module: 'GeneralProcedure', element: <List_151 /> },
  { path: '/modul/general-procedure/tambah', module: 'GeneralProcedure', element: <Form_151 /> },
  { path: '/modul/general-procedure/:id/edit', module: 'GeneralProcedure', element: <Form_151 /> },
  { path: '/modul/general-profession', module: 'GeneralProfession', element: <List_152 /> },
  { path: '/modul/general-profession/tambah', module: 'GeneralProfession', element: <Form_152 /> },
  { path: '/modul/general-profession/:id/edit', module: 'GeneralProfession', element: <Form_152 /> },
  { path: '/modul/general-quantity-restriction', module: 'GeneralQuantityRestriction', element: <List_153 /> },
  { path: '/modul/general-quantity-restriction/tambah', module: 'GeneralQuantityRestriction', element: <Form_153 /> },
  { path: '/modul/general-quantity-restriction/:id/edit', module: 'GeneralQuantityRestriction', element: <Form_153 /> },
  { path: '/modul/general-quarter', module: 'GeneralQuarter', element: <List_154 /> },
  { path: '/modul/general-quarter/tambah', module: 'GeneralQuarter', element: <Form_154 /> },
  { path: '/modul/general-quarter/:id/edit', module: 'GeneralQuarter', element: <Form_154 /> },
  { path: '/modul/general-radiology-room', module: 'GeneralRadiologyRoom', element: <List_155 /> },
  { path: '/modul/general-radiology-room/tambah', module: 'GeneralRadiologyRoom', element: <Form_155 /> },
  { path: '/modul/general-radiology-room/:id/edit', module: 'GeneralRadiologyRoom', element: <Form_155 /> },
  { path: '/modul/general-referral-code', module: 'GeneralReferralCode', element: <List_156 /> },
  { path: '/modul/general-referral-code/tambah', module: 'GeneralReferralCode', element: <Form_156 /> },
  { path: '/modul/general-referral-code/:id/edit', module: 'GeneralReferralCode', element: <Form_156 /> },
  { path: '/modul/general-referral-room', module: 'GeneralReferralRoom', element: <List_157 /> },
  { path: '/modul/general-referral-room/tambah', module: 'GeneralReferralRoom', element: <Form_157 /> },
  { path: '/modul/general-referral-room/:id/edit', module: 'GeneralReferralRoom', element: <Form_157 /> },
  { path: '/modul/general-referral-status', module: 'GeneralReferralStatus', element: <List_158 /> },
  { path: '/modul/general-referral-status/tambah', module: 'GeneralReferralStatus', element: <Form_158 /> },
  { path: '/modul/general-referral-status/:id/edit', module: 'GeneralReferralStatus', element: <Form_158 /> },
  { path: '/modul/general-referral-type', module: 'GeneralReferralType', element: <List_159 /> },
  { path: '/modul/general-referral-type/tambah', module: 'GeneralReferralType', element: <Form_159 /> },
  { path: '/modul/general-referral-type/:id/edit', module: 'GeneralReferralType', element: <Form_159 /> },
  { path: '/modul/general-region-type', module: 'GeneralRegionType', element: <List_160 /> },
  { path: '/modul/general-region-type/tambah', module: 'GeneralRegionType', element: <Form_160 /> },
  { path: '/modul/general-region-type/:id/edit', module: 'GeneralRegionType', element: <Form_160 /> },
  { path: '/modul/general-religion', module: 'GeneralReligion', element: <List_161 /> },
  { path: '/modul/general-religion/tambah', module: 'GeneralReligion', element: <Form_161 /> },
  { path: '/modul/general-religion/:id/edit', module: 'GeneralReligion', element: <Form_161 /> },
  { path: '/modul/general-report-type', module: 'GeneralReportType', element: <List_162 /> },
  { path: '/modul/general-report-type/tambah', module: 'GeneralReportType', element: <Form_162 /> },
  { path: '/modul/general-report-type/:id/edit', module: 'GeneralReportType', element: <Form_162 /> },
  { path: '/modul/general-report-type-item', module: 'GeneralReportTypeItem', element: <List_163 /> },
  { path: '/modul/general-report-type-item/tambah', module: 'GeneralReportTypeItem', element: <Form_163 /> },
  { path: '/modul/general-report-type-item/:id/edit', module: 'GeneralReportTypeItem', element: <Form_163 /> },
  { path: '/modul/general-reservation-status', module: 'GeneralReservationStatus', element: <List_164 /> },
  { path: '/modul/general-reservation-status/tambah', module: 'GeneralReservationStatus', element: <Form_164 /> },
  { path: '/modul/general-reservation-status/:id/edit', module: 'GeneralReservationStatus', element: <Form_164 /> },
  { path: '/modul/general-return-cancellation-reason', module: 'GeneralReturnCancellationReason', element: <List_165 /> },
  { path: '/modul/general-return-cancellation-reason/tambah', module: 'GeneralReturnCancellationReason', element: <Form_165 /> },
  { path: '/modul/general-return-cancellation-reason/:id/edit', module: 'GeneralReturnCancellationReason', element: <Form_165 /> },
  { path: '/modul/general-return-cancellation-type', module: 'GeneralReturnCancellationType', element: <List_166 /> },
  { path: '/modul/general-return-cancellation-type/tambah', module: 'GeneralReturnCancellationType', element: <Form_166 /> },
  { path: '/modul/general-return-cancellation-type/:id/edit', module: 'GeneralReturnCancellationType', element: <Form_166 /> },
  { path: '/modul/general-room', module: 'GeneralRoom', element: <List_167 /> },
  { path: '/modul/general-room/tambah', module: 'GeneralRoom', element: <Form_167 /> },
  { path: '/modul/general-room/:id/edit', module: 'GeneralRoom', element: <Form_167 /> },
  { path: '/modul/general-room-class', module: 'GeneralRoomClass', element: <List_168 /> },
  { path: '/modul/general-room-class/tambah', module: 'GeneralRoomClass', element: <Form_168 /> },
  { path: '/modul/general-room-class/:id/edit', module: 'GeneralRoomClass', element: <Form_168 /> },
  { path: '/modul/general-room-class-reference-group', module: 'GeneralRoomClassReferenceGroup', element: <List_169 /> },
  { path: '/modul/general-room-class-reference-group/tambah', module: 'GeneralRoomClassReferenceGroup', element: <Form_169 /> },
  { path: '/modul/general-room-class-reference-group/:id/edit', module: 'GeneralRoomClassReferenceGroup', element: <Form_169 /> },
  { path: '/modul/general-sales-tax', module: 'GeneralSalesTax', element: <List_170 /> },
  { path: '/modul/general-sales-tax/tambah', module: 'GeneralSalesTax', element: <Form_170 /> },
  { path: '/modul/general-sales-tax/:id/edit', module: 'GeneralSalesTax', element: <Form_170 /> },
  { path: '/modul/general-scanned-document', module: 'GeneralScannedDocument', element: <List_171 /> },
  { path: '/modul/general-scanned-document/tambah', module: 'GeneralScannedDocument', element: <Form_171 /> },
  { path: '/modul/general-scanned-document/:id/edit', module: 'GeneralScannedDocument', element: <Form_171 /> },
  { path: '/modul/general-service', module: 'GeneralService', element: <List_172 /> },
  { path: '/modul/general-service/tambah', module: 'GeneralService', element: <Form_172 /> },
  { path: '/modul/general-service/:id/edit', module: 'GeneralService', element: <Form_172 /> },
  { path: '/modul/general-service-tariff', module: 'GeneralServiceTariff', element: <List_173 /> },
  { path: '/modul/general-service-tariff/tambah', module: 'GeneralServiceTariff', element: <Form_173 /> },
  { path: '/modul/general-service-tariff/:id/edit', module: 'GeneralServiceTariff', element: <Form_173 /> },
  { path: '/modul/general-service-tariff-distribution', module: 'GeneralServiceTariffDistribution', element: <List_174 /> },
  { path: '/modul/general-service-tariff-distribution/tambah', module: 'GeneralServiceTariffDistribution', element: <Form_174 /> },
  { path: '/modul/general-service-tariff-distribution/:id/edit', module: 'GeneralServiceTariffDistribution', element: <Form_174 /> },
  { path: '/modul/general-service-type', module: 'GeneralServiceType', element: <List_175 /> },
  { path: '/modul/general-service-type/tambah', module: 'GeneralServiceType', element: <Form_175 /> },
  { path: '/modul/general-service-type/:id/edit', module: 'GeneralServiceType', element: <Form_175 /> },
  { path: '/modul/general-sitb-anatomy-classification', module: 'GeneralSitbAnatomyClassification', element: <List_176 /> },
  { path: '/modul/general-sitb-anatomy-classification/tambah', module: 'GeneralSitbAnatomyClassification', element: <Form_176 /> },
  { path: '/modul/general-sitb-anatomy-classification/:id/edit', module: 'GeneralSitbAnatomyClassification', element: <Form_176 /> },
  { path: '/modul/general-sitb-art', module: 'GeneralSitbArt', element: <List_177 /> },
  { path: '/modul/general-sitb-art/tambah', module: 'GeneralSitbArt', element: <Form_177 /> },
  { path: '/modul/general-sitb-art/:id/edit', module: 'GeneralSitbArt', element: <Form_177 /> },
  { path: '/modul/general-sitb-chest-xray-result', module: 'GeneralSitbChestXrayResult', element: <List_178 /> },
  { path: '/modul/general-sitb-chest-xray-result/tambah', module: 'GeneralSitbChestXrayResult', element: <Form_178 /> },
  { path: '/modul/general-sitb-chest-xray-result/:id/edit', module: 'GeneralSitbChestXrayResult', element: <Form_178 /> },
  { path: '/modul/general-sitb-child-tb-score0-to13', module: 'GeneralSitbChildTbScore0To13', element: <List_179 /> },
  { path: '/modul/general-sitb-child-tb-score0-to13/tambah', module: 'GeneralSitbChildTbScore0To13', element: <Form_179 /> },
  { path: '/modul/general-sitb-child-tb-score0-to13/:id/edit', module: 'GeneralSitbChildTbScore0To13', element: <Form_179 /> },
  { path: '/modul/general-sitb-child-tb-score5', module: 'GeneralSitbChildTbScore5', element: <List_180 /> },
  { path: '/modul/general-sitb-child-tb-score5/tambah', module: 'GeneralSitbChildTbScore5', element: <Form_180 /> },
  { path: '/modul/general-sitb-child-tb-score5/:id/edit', module: 'GeneralSitbChildTbScore5', element: <Form_180 /> },
  { path: '/modul/general-sitb-child-tb-score6', module: 'GeneralSitbChildTbScore6', element: <List_181 /> },
  { path: '/modul/general-sitb-child-tb-score6/tambah', module: 'GeneralSitbChildTbScore6', element: <Form_181 /> },
  { path: '/modul/general-sitb-child-tb-score6/:id/edit', module: 'GeneralSitbChildTbScore6', element: <Form_181 /> },
  { path: '/modul/general-sitb-diagnosis-type', module: 'GeneralSitbDiagnosisType', element: <List_182 /> },
  { path: '/modul/general-sitb-diagnosis-type/tambah', module: 'GeneralSitbDiagnosisType', element: <Form_182 /> },
  { path: '/modul/general-sitb-diagnosis-type/:id/edit', module: 'GeneralSitbDiagnosisType', element: <Form_182 /> },
  { path: '/modul/general-sitb-dm', module: 'GeneralSitbDm', element: <List_183 /> },
  { path: '/modul/general-sitb-dm/tambah', module: 'GeneralSitbDm', element: <Form_183 /> },
  { path: '/modul/general-sitb-dm/:id/edit', module: 'GeneralSitbDm', element: <Form_183 /> },
  { path: '/modul/general-sitb-dm-therapy', module: 'GeneralSitbDmTherapy', element: <List_184 /> },
  { path: '/modul/general-sitb-dm-therapy/tambah', module: 'GeneralSitbDmTherapy', element: <Form_184 /> },
  { path: '/modul/general-sitb-dm-therapy/:id/edit', module: 'GeneralSitbDmTherapy', element: <Form_184 /> },
  { path: '/modul/general-sitb-drug-source', module: 'GeneralSitbDrugSource', element: <List_185 /> },
  { path: '/modul/general-sitb-drug-source/tambah', module: 'GeneralSitbDrugSource', element: <Form_185 /> },
  { path: '/modul/general-sitb-drug-source/:id/edit', module: 'GeneralSitbDrugSource', element: <Form_185 /> },
  { path: '/modul/general-sitb-end-microscopy', module: 'GeneralSitbEndMicroscopy', element: <List_186 /> },
  { path: '/modul/general-sitb-end-microscopy/tambah', module: 'GeneralSitbEndMicroscopy', element: <Form_186 /> },
  { path: '/modul/general-sitb-end-microscopy/:id/edit', module: 'GeneralSitbEndMicroscopy', element: <Form_186 /> },
  { path: '/modul/general-sitb-hiv-status-classification', module: 'GeneralSitbHivStatusClassification', element: <List_187 /> },
  { path: '/modul/general-sitb-hiv-status-classification/tambah', module: 'GeneralSitbHivStatusClassification', element: <Form_187 /> },
  { path: '/modul/general-sitb-hiv-status-classification/:id/edit', module: 'GeneralSitbHivStatusClassification', element: <Form_187 /> },
  { path: '/modul/general-sitb-hiv-test-result', module: 'GeneralSitbHivTestResult', element: <List_188 /> },
  { path: '/modul/general-sitb-hiv-test-result/tambah', module: 'GeneralSitbHivTestResult', element: <Form_188 /> },
  { path: '/modul/general-sitb-hiv-test-result/:id/edit', module: 'GeneralSitbHivTestResult', element: <Form_188 /> },
  { path: '/modul/general-sitb-month2-microscopy', module: 'GeneralSitbMonth2Microscopy', element: <List_189 /> },
  { path: '/modul/general-sitb-month2-microscopy/tambah', module: 'GeneralSitbMonth2Microscopy', element: <Form_189 /> },
  { path: '/modul/general-sitb-month2-microscopy/:id/edit', module: 'GeneralSitbMonth2Microscopy', element: <Form_189 /> },
  { path: '/modul/general-sitb-month3-microscopy', module: 'GeneralSitbMonth3Microscopy', element: <List_190 /> },
  { path: '/modul/general-sitb-month3-microscopy/tambah', module: 'GeneralSitbMonth3Microscopy', element: <Form_190 /> },
  { path: '/modul/general-sitb-month3-microscopy/:id/edit', module: 'GeneralSitbMonth3Microscopy', element: <Form_190 /> },
  { path: '/modul/general-sitb-month5-microscopy', module: 'GeneralSitbMonth5Microscopy', element: <List_191 /> },
  { path: '/modul/general-sitb-month5-microscopy/tambah', module: 'GeneralSitbMonth5Microscopy', element: <Form_191 /> },
  { path: '/modul/general-sitb-month5-microscopy/:id/edit', module: 'GeneralSitbMonth5Microscopy', element: <Form_191 /> },
  { path: '/modul/general-sitb-oat-guideline', module: 'GeneralSitbOatGuideline', element: <List_192 /> },
  { path: '/modul/general-sitb-oat-guideline/tambah', module: 'GeneralSitbOatGuideline', element: <Form_192 /> },
  { path: '/modul/general-sitb-oat-guideline/:id/edit', module: 'GeneralSitbOatGuideline', element: <Form_192 /> },
  { path: '/modul/general-sitb-ppk', module: 'GeneralSitbPpk', element: <List_193 /> },
  { path: '/modul/general-sitb-ppk/tambah', module: 'GeneralSitbPpk', element: <Form_193 /> },
  { path: '/modul/general-sitb-ppk/:id/edit', module: 'GeneralSitbPpk', element: <Form_193 /> },
  { path: '/modul/general-sitb-pre-culture', module: 'GeneralSitbPreCulture', element: <List_194 /> },
  { path: '/modul/general-sitb-pre-culture/tambah', module: 'GeneralSitbPreCulture', element: <Form_194 /> },
  { path: '/modul/general-sitb-pre-culture/:id/edit', module: 'GeneralSitbPreCulture', element: <Form_194 /> },
  { path: '/modul/general-sitb-pre-microscopy', module: 'GeneralSitbPreMicroscopy', element: <List_195 /> },
  { path: '/modul/general-sitb-pre-microscopy/tambah', module: 'GeneralSitbPreMicroscopy', element: <Form_195 /> },
  { path: '/modul/general-sitb-pre-microscopy/:id/edit', module: 'GeneralSitbPreMicroscopy', element: <Form_195 /> },
  { path: '/modul/general-sitb-pre-tcm', module: 'GeneralSitbPreTcm', element: <List_196 /> },
  { path: '/modul/general-sitb-pre-tcm/tambah', module: 'GeneralSitbPreTcm', element: <Form_196 /> },
  { path: '/modul/general-sitb-pre-tcm/:id/edit', module: 'GeneralSitbPreTcm', element: <Form_196 /> },
  { path: '/modul/general-sitb-referrer-type', module: 'GeneralSitbReferrerType', element: <List_197 /> },
  { path: '/modul/general-sitb-referrer-type/tambah', module: 'GeneralSitbReferrerType', element: <Form_197 /> },
  { path: '/modul/general-sitb-referrer-type/:id/edit', module: 'GeneralSitbReferrerType', element: <Form_197 /> },
  { path: '/modul/general-sitb-tb03-ro-transfer', module: 'GeneralSitbTb03RoTransfer', element: <List_198 /> },
  { path: '/modul/general-sitb-tb03-ro-transfer/tambah', module: 'GeneralSitbTb03RoTransfer', element: <Form_198 /> },
  { path: '/modul/general-sitb-tb03-ro-transfer/:id/edit', module: 'GeneralSitbTb03RoTransfer', element: <Form_198 /> },
  { path: '/modul/general-sitb-thorax-not-done', module: 'GeneralSitbThoraxNotDone', element: <List_199 /> },
  { path: '/modul/general-sitb-thorax-not-done/tambah', module: 'GeneralSitbThoraxNotDone', element: <Form_199 /> },
  { path: '/modul/general-sitb-thorax-not-done/:id/edit', module: 'GeneralSitbThoraxNotDone', element: <Form_199 /> },
  { path: '/modul/general-sitb-treatment-history-classification', module: 'GeneralSitbTreatmentHistoryClassification', element: <List_200 /> },
  { path: '/modul/general-sitb-treatment-history-classification/tambah', module: 'GeneralSitbTreatmentHistoryClassification', element: <Form_200 /> },
  { path: '/modul/general-sitb-treatment-history-classification/:id/edit', module: 'GeneralSitbTreatmentHistoryClassification', element: <Form_200 /> },
  { path: '/modul/general-sitb-treatment-outcome', module: 'GeneralSitbTreatmentOutcome', element: <List_201 /> },
  { path: '/modul/general-sitb-treatment-outcome/tambah', module: 'GeneralSitbTreatmentOutcome', element: <Form_201 /> },
  { path: '/modul/general-sitb-treatment-outcome/:id/edit', module: 'GeneralSitbTreatmentOutcome', element: <Form_201 /> },
  { path: '/modul/general-sitb-treatment-status', module: 'GeneralSitbTreatmentStatus', element: <List_202 /> },
  { path: '/modul/general-sitb-treatment-status/tambah', module: 'GeneralSitbTreatmentStatus', element: <Form_202 /> },
  { path: '/modul/general-sitb-treatment-status/:id/edit', module: 'GeneralSitbTreatmentStatus', element: <Form_202 /> },
  { path: '/modul/general-staff-member', module: 'GeneralStaffMember', element: <List_203 /> },
  { path: '/modul/general-staff-member/tambah', module: 'GeneralStaffMember', element: <Form_203 /> },
  { path: '/modul/general-staff-member/:id/edit', module: 'GeneralStaffMember', element: <Form_203 /> },
  { path: '/modul/general-staff-ward-assignment', module: 'GeneralStaffWardAssignment', element: <List_204 /> },
  { path: '/modul/general-staff-ward-assignment/tambah', module: 'GeneralStaffWardAssignment', element: <Form_204 /> },
  { path: '/modul/general-staff-ward-assignment/:id/edit', module: 'GeneralStaffWardAssignment', element: <Form_204 /> },
  { path: '/modul/general-tariff-type', module: 'GeneralTariffType', element: <List_205 /> },
  { path: '/modul/general-tariff-type/tambah', module: 'GeneralTariffType', element: <Form_205 /> },
  { path: '/modul/general-tariff-type/:id/edit', module: 'GeneralTariffType', element: <Form_205 /> },
  { path: '/modul/general-tb-patient-category', module: 'GeneralTbPatientCategory', element: <List_206 /> },
  { path: '/modul/general-tb-patient-category/tambah', module: 'GeneralTbPatientCategory', element: <Form_206 /> },
  { path: '/modul/general-tb-patient-category/:id/edit', module: 'GeneralTbPatientCategory', element: <Form_206 /> },
  { path: '/modul/general-treatment-category', module: 'GeneralTreatmentCategory', element: <List_207 /> },
  { path: '/modul/general-treatment-category/tambah', module: 'GeneralTreatmentCategory', element: <Form_207 /> },
  { path: '/modul/general-treatment-category/:id/edit', module: 'GeneralTreatmentCategory', element: <Form_207 /> },
  { path: '/modul/general-user-group', module: 'GeneralUserGroup', element: <List_208 /> },
  { path: '/modul/general-user-group/tambah', module: 'GeneralUserGroup', element: <Form_208 /> },
  { path: '/modul/general-user-group/:id/edit', module: 'GeneralUserGroup', element: <Form_208 /> },
  { path: '/modul/general-user-type', module: 'GeneralUserType', element: <List_209 /> },
  { path: '/modul/general-user-type/tambah', module: 'GeneralUserType', element: <Form_209 /> },
  { path: '/modul/general-user-type/:id/edit', module: 'GeneralUserType', element: <Form_209 /> },
  { path: '/modul/general-video-attachment', module: 'GeneralVideoAttachment', element: <List_210 /> },
  { path: '/modul/general-video-attachment/tambah', module: 'GeneralVideoAttachment', element: <Form_210 /> },
  { path: '/modul/general-video-attachment/:id/edit', module: 'GeneralVideoAttachment', element: <Form_210 /> },
  { path: '/modul/general-visit-activity-status', module: 'GeneralVisitActivityStatus', element: <List_211 /> },
  { path: '/modul/general-visit-activity-status/tambah', module: 'GeneralVisitActivityStatus', element: <Form_211 /> },
  { path: '/modul/general-visit-activity-status/:id/edit', module: 'GeneralVisitActivityStatus', element: <Form_211 /> },
  { path: '/modul/general-visit-cancellation-reason', module: 'GeneralVisitCancellationReason', element: <List_212 /> },
  { path: '/modul/general-visit-cancellation-reason/tambah', module: 'GeneralVisitCancellationReason', element: <Form_212 /> },
  { path: '/modul/general-visit-cancellation-reason/:id/edit', module: 'GeneralVisitCancellationReason', element: <Form_212 /> },
  { path: '/modul/general-visit-status', module: 'GeneralVisitStatus', element: <List_213 /> },
  { path: '/modul/general-visit-status/tambah', module: 'GeneralVisitStatus', element: <Form_213 /> },
  { path: '/modul/general-visit-status/:id/edit', module: 'GeneralVisitStatus', element: <Form_213 /> },
  { path: '/modul/general-visit-type', module: 'GeneralVisitType', element: <List_214 /> },
  { path: '/modul/general-visit-type/tambah', module: 'GeneralVisitType', element: <Form_214 /> },
  { path: '/modul/general-visit-type/:id/edit', module: 'GeneralVisitType', element: <Form_214 /> },
  { path: '/modul/general-ward', module: 'GeneralWard', element: <List_215 /> },
  { path: '/modul/general-ward/tambah', module: 'GeneralWard', element: <Form_215 /> },
  { path: '/modul/general-ward/:id/edit', module: 'GeneralWard', element: <Form_215 /> },
  { path: '/modul/general-ward-class-assignment', module: 'GeneralWardClassAssignment', element: <List_216 /> },
  { path: '/modul/general-ward-class-assignment/tambah', module: 'GeneralWardClassAssignment', element: <Form_216 /> },
  { path: '/modul/general-ward-class-assignment/:id/edit', module: 'GeneralWardClassAssignment', element: <Form_216 /> },
  { path: '/modul/general-ward-service', module: 'GeneralWardService', element: <List_217 /> },
  { path: '/modul/general-ward-service/tambah', module: 'GeneralWardService', element: <Form_217 /> },
  { path: '/modul/general-ward-service/:id/edit', module: 'GeneralWardService', element: <Form_217 /> },
  { path: '/modul/general-ward-tariff', module: 'GeneralWardTariff', element: <List_218 /> },
  { path: '/modul/general-ward-tariff/tambah', module: 'GeneralWardTariff', element: <Form_218 /> },
  { path: '/modul/general-ward-tariff/:id/edit', module: 'GeneralWardTariff', element: <Form_218 /> },
  { path: '/modul/general-ward-transfer-route', module: 'GeneralWardTransferRoute', element: <List_219 /> },
  { path: '/modul/general-ward-transfer-route/tambah', module: 'GeneralWardTransferRoute', element: <Form_219 /> },
  { path: '/modul/general-ward-transfer-route/:id/edit', module: 'GeneralWardTransferRoute', element: <Form_219 /> },
  { path: '/modul/general-ward-type', module: 'GeneralWardType', element: <List_220 /> },
  { path: '/modul/general-ward-type/tambah', module: 'GeneralWardType', element: <Form_220 /> },
  { path: '/modul/general-ward-type/:id/edit', module: 'GeneralWardType', element: <Form_220 /> },
  { path: '/modul/general-ward-visit-type', module: 'GeneralWardVisitType', element: <List_221 /> },
  { path: '/modul/general-ward-visit-type/tambah', module: 'GeneralWardVisitType', element: <Form_221 /> },
  { path: '/modul/general-ward-visit-type/:id/edit', module: 'GeneralWardVisitType', element: <Form_221 /> },
  { path: '/modul/general-yes-no-option', module: 'GeneralYesNoOption', element: <List_222 /> },
  { path: '/modul/general-yes-no-option/tambah', module: 'GeneralYesNoOption', element: <Form_222 /> },
  { path: '/modul/general-yes-no-option/:id/edit', module: 'GeneralYesNoOption', element: <Form_222 /> },
  { path: '/modul/inventory-blood-bag', module: 'InventoryBloodBag', element: <List_223 /> },
  { path: '/modul/inventory-blood-bag/tambah', module: 'InventoryBloodBag', element: <Form_223 /> },
  { path: '/modul/inventory-blood-bag/:id/edit', module: 'InventoryBloodBag', element: <Form_223 /> },
  { path: '/modul/inventory-diet-order', module: 'InventoryDietOrder', element: <List_224 /> },
  { path: '/modul/inventory-diet-order/tambah', module: 'InventoryDietOrder', element: <Form_224 /> },
  { path: '/modul/inventory-diet-order/:id/edit', module: 'InventoryDietOrder', element: <Form_224 /> },
  { path: '/modul/inventory-goods-receipt', module: 'InventoryGoodsReceipt', element: <List_225 /> },
  { path: '/modul/inventory-goods-receipt/tambah', module: 'InventoryGoodsReceipt', element: <Form_225 /> },
  { path: '/modul/inventory-goods-receipt/:id/edit', module: 'InventoryGoodsReceipt', element: <Form_225 /> },
  { path: '/modul/inventory-goods-receipt-cancellation', module: 'InventoryGoodsReceiptCancellation', element: <List_226 /> },
  { path: '/modul/inventory-goods-receipt-cancellation/tambah', module: 'InventoryGoodsReceiptCancellation', element: <Form_226 /> },
  { path: '/modul/inventory-goods-receipt-cancellation/:id/edit', module: 'InventoryGoodsReceiptCancellation', element: <Form_226 /> },
  { path: '/modul/inventory-goods-return', module: 'InventoryGoodsReturn', element: <List_227 /> },
  { path: '/modul/inventory-goods-return/tambah', module: 'InventoryGoodsReturn', element: <Form_227 /> },
  { path: '/modul/inventory-goods-return/:id/edit', module: 'InventoryGoodsReturn', element: <Form_227 /> },
  { path: '/modul/inventory-goods-return-item', module: 'InventoryGoodsReturnItem', element: <List_228 /> },
  { path: '/modul/inventory-goods-return-item/tambah', module: 'InventoryGoodsReturnItem', element: <Form_228 /> },
  { path: '/modul/inventory-goods-return-item/:id/edit', module: 'InventoryGoodsReturnItem', element: <Form_228 /> },
  { path: '/modul/inventory-item', module: 'InventoryItem', element: <List_229 /> },
  { path: '/modul/inventory-item/tambah', module: 'InventoryItem', element: <Form_229 /> },
  { path: '/modul/inventory-item/:id/edit', module: 'InventoryItem', element: <Form_229 /> },
  { path: '/modul/inventory-item-category', module: 'InventoryItemCategory', element: <List_230 /> },
  { path: '/modul/inventory-item-category/tambah', module: 'InventoryItemCategory', element: <Form_230 /> },
  { path: '/modul/inventory-item-category/:id/edit', module: 'InventoryItemCategory', element: <Form_230 /> },
  { path: '/modul/inventory-item-classification', module: 'InventoryItemClassification', element: <List_231 /> },
  { path: '/modul/inventory-item-classification/tambah', module: 'InventoryItemClassification', element: <Form_231 /> },
  { path: '/modul/inventory-item-classification/:id/edit', module: 'InventoryItemClassification', element: <Form_231 /> },
  { path: '/modul/inventory-item-price', module: 'InventoryItemPrice', element: <List_232 /> },
  { path: '/modul/inventory-item-price/tambah', module: 'InventoryItemPrice', element: <Form_232 /> },
  { path: '/modul/inventory-item-price/:id/edit', module: 'InventoryItemPrice', element: <Form_232 /> },
  { path: '/modul/inventory-item-serial-number', module: 'InventoryItemSerialNumber', element: <List_233 /> },
  { path: '/modul/inventory-item-serial-number/tambah', module: 'InventoryItemSerialNumber', element: <Form_233 /> },
  { path: '/modul/inventory-item-serial-number/:id/edit', module: 'InventoryItemSerialNumber', element: <Form_233 /> },
  { path: '/modul/inventory-linen-tracking', module: 'InventoryLinenTracking', element: <List_234 /> },
  { path: '/modul/inventory-linen-tracking/tambah', module: 'InventoryLinenTracking', element: <Form_234 /> },
  { path: '/modul/inventory-linen-tracking/:id/edit', module: 'InventoryLinenTracking', element: <Form_234 /> },
  { path: '/modul/inventory-minimum-stock-level', module: 'InventoryMinimumStockLevel', element: <List_235 /> },
  { path: '/modul/inventory-minimum-stock-level/tambah', module: 'InventoryMinimumStockLevel', element: <Form_235 /> },
  { path: '/modul/inventory-minimum-stock-level/:id/edit', module: 'InventoryMinimumStockLevel', element: <Form_235 /> },
  { path: '/modul/inventory-pharmacy-package', module: 'InventoryPharmacyPackage', element: <List_236 /> },
  { path: '/modul/inventory-pharmacy-package/tambah', module: 'InventoryPharmacyPackage', element: <Form_236 /> },
  { path: '/modul/inventory-pharmacy-package/:id/edit', module: 'InventoryPharmacyPackage', element: <Form_236 /> },
  { path: '/modul/inventory-receiving-item', module: 'InventoryReceivingItem', element: <List_237 /> },
  { path: '/modul/inventory-receiving-item/tambah', module: 'InventoryReceivingItem', element: <Form_237 /> },
  { path: '/modul/inventory-receiving-item/:id/edit', module: 'InventoryReceivingItem', element: <Form_237 /> },
  { path: '/modul/inventory-receiving-record', module: 'InventoryReceivingRecord', element: <List_238 /> },
  { path: '/modul/inventory-receiving-record/tambah', module: 'InventoryReceivingRecord', element: <Form_238 /> },
  { path: '/modul/inventory-receiving-record/:id/edit', module: 'InventoryReceivingRecord', element: <Form_238 /> },
  { path: '/modul/inventory-shipment', module: 'InventoryShipment', element: <List_239 /> },
  { path: '/modul/inventory-shipment/tambah', module: 'InventoryShipment', element: <Form_239 /> },
  { path: '/modul/inventory-shipment/:id/edit', module: 'InventoryShipment', element: <Form_239 /> },
  { path: '/modul/inventory-shipment-item', module: 'InventoryShipmentItem', element: <List_240 /> },
  { path: '/modul/inventory-shipment-item/tambah', module: 'InventoryShipmentItem', element: <Form_240 /> },
  { path: '/modul/inventory-shipment-item/:id/edit', module: 'InventoryShipmentItem', element: <Form_240 /> },
  { path: '/modul/inventory-sterilization-cycle', module: 'InventorySterilizationCycle', element: <List_241 /> },
  { path: '/modul/inventory-sterilization-cycle/tambah', module: 'InventorySterilizationCycle', element: <Form_241 /> },
  { path: '/modul/inventory-sterilization-cycle/:id/edit', module: 'InventorySterilizationCycle', element: <Form_241 /> },
  { path: '/modul/inventory-stock-opname', module: 'InventoryStockOpname', element: <List_242 /> },
  { path: '/modul/inventory-stock-opname/tambah', module: 'InventoryStockOpname', element: <Form_242 /> },
  { path: '/modul/inventory-stock-opname/:id/edit', module: 'InventoryStockOpname', element: <Form_242 /> },
  { path: '/modul/inventory-stock-opname-item', module: 'InventoryStockOpnameItem', element: <List_243 /> },
  { path: '/modul/inventory-stock-opname-item/tambah', module: 'InventoryStockOpnameItem', element: <Form_243 /> },
  { path: '/modul/inventory-stock-opname-item/:id/edit', module: 'InventoryStockOpnameItem', element: <Form_243 /> },
  { path: '/modul/inventory-stock-request', module: 'InventoryStockRequest', element: <List_244 /> },
  { path: '/modul/inventory-stock-request/tambah', module: 'InventoryStockRequest', element: <Form_244 /> },
  { path: '/modul/inventory-stock-request/:id/edit', module: 'InventoryStockRequest', element: <Form_244 /> },
  { path: '/modul/inventory-stock-request-item', module: 'InventoryStockRequestItem', element: <List_245 /> },
  { path: '/modul/inventory-stock-request-item/tambah', module: 'InventoryStockRequestItem', element: <Form_245 /> },
  { path: '/modul/inventory-stock-request-item/:id/edit', module: 'InventoryStockRequestItem', element: <Form_245 /> },
  { path: '/modul/inventory-supplier', module: 'InventorySupplier', element: <List_246 /> },
  { path: '/modul/inventory-supplier/tambah', module: 'InventorySupplier', element: <Form_246 /> },
  { path: '/modul/inventory-supplier/:id/edit', module: 'InventorySupplier', element: <Form_246 /> },
  { path: '/modul/inventory-unit-of-measure', module: 'InventoryUnitOfMeasure', element: <List_247 /> },
  { path: '/modul/inventory-unit-of-measure/tambah', module: 'InventoryUnitOfMeasure', element: <Form_247 /> },
  { path: '/modul/inventory-unit-of-measure/:id/edit', module: 'InventoryUnitOfMeasure', element: <Form_247 /> },
  { path: '/modul/inventory-ward-item-stock', module: 'InventoryWardItemStock', element: <List_248 /> },
  { path: '/modul/inventory-ward-item-stock/tambah', module: 'InventoryWardItemStock', element: <Form_248 /> },
  { path: '/modul/inventory-ward-item-stock/:id/edit', module: 'InventoryWardItemStock', element: <Form_248 /> },
  { path: '/modul/inventory-ward-stock-transaction', module: 'InventoryWardStockTransaction', element: <List_249 /> },
  { path: '/modul/inventory-ward-stock-transaction/tambah', module: 'InventoryWardStockTransaction', element: <Form_249 /> },
  { path: '/modul/inventory-ward-stock-transaction/:id/edit', module: 'InventoryWardStockTransaction', element: <Form_249 /> },
  { path: '/modul/kemkes-blood-type', module: 'KemkesBloodType', element: <List_250 /> },
  { path: '/modul/kemkes-blood-type/tambah', module: 'KemkesBloodType', element: <Form_250 /> },
  { path: '/modul/kemkes-blood-type/:id/edit', module: 'KemkesBloodType', element: <Form_250 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-approval', module: 'LayananAntimicrobialStewardshipApproval', element: <List_251 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-approval/tambah', module: 'LayananAntimicrobialStewardshipApproval', element: <Form_251 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-approval/:id/edit', module: 'LayananAntimicrobialStewardshipApproval', element: <Form_251 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-form', module: 'LayananAntimicrobialStewardshipForm', element: <List_252 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-form/tambah', module: 'LayananAntimicrobialStewardshipForm', element: <Form_252 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-form/:id/edit', module: 'LayananAntimicrobialStewardshipForm', element: <Form_252 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-form-item', module: 'LayananAntimicrobialStewardshipFormItem', element: <List_253 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-form-item/tambah', module: 'LayananAntimicrobialStewardshipFormItem', element: <Form_253 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-form-item/:id/edit', module: 'LayananAntimicrobialStewardshipFormItem', element: <Form_253 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-general-examination', module: 'LayananAntimicrobialStewardshipGeneralExamination', element: <List_254 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-general-examination/tambah', module: 'LayananAntimicrobialStewardshipGeneralExamination', element: <Form_254 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-general-examination/:id/edit', module: 'LayananAntimicrobialStewardshipGeneralExamination', element: <Form_254 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-lab-result', module: 'LayananAntimicrobialStewardshipLabResult', element: <List_255 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-lab-result/tambah', module: 'LayananAntimicrobialStewardshipLabResult', element: <Form_255 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-lab-result/:id/edit', module: 'LayananAntimicrobialStewardshipLabResult', element: <Form_255 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-microbiology-result', module: 'LayananAntimicrobialStewardshipMicrobiologyResult', element: <List_256 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-microbiology-result/tambah', module: 'LayananAntimicrobialStewardshipMicrobiologyResult', element: <Form_256 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-microbiology-result/:id/edit', module: 'LayananAntimicrobialStewardshipMicrobiologyResult', element: <Form_256 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-other-support-result', module: 'LayananAntimicrobialStewardshipOtherSupportResult', element: <List_257 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-other-support-result/tambah', module: 'LayananAntimicrobialStewardshipOtherSupportResult', element: <Form_257 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-other-support-result/:id/edit', module: 'LayananAntimicrobialStewardshipOtherSupportResult', element: <Form_257 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-prior-history', module: 'LayananAntimicrobialStewardshipPriorHistory', element: <List_258 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-prior-history/tambah', module: 'LayananAntimicrobialStewardshipPriorHistory', element: <Form_258 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-prior-history/:id/edit', module: 'LayananAntimicrobialStewardshipPriorHistory', element: <Form_258 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-radiology-result', module: 'LayananAntimicrobialStewardshipRadiologyResult', element: <List_259 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-radiology-result/tambah', module: 'LayananAntimicrobialStewardshipRadiologyResult', element: <Form_259 /> },
  { path: '/modul/layanan-antimicrobial-stewardship-radiology-result/:id/edit', module: 'LayananAntimicrobialStewardshipRadiologyResult', element: <Form_259 /> },
  { path: '/modul/layanan-birth-record', module: 'LayananBirthRecord', element: <List_260 /> },
  { path: '/modul/layanan-birth-record/tambah', module: 'LayananBirthRecord', element: <Form_260 /> },
  { path: '/modul/layanan-birth-record/:id/edit', module: 'LayananBirthRecord', element: <Form_260 /> },
  { path: '/modul/layanan-blood-request-item', module: 'LayananBloodRequestItem', element: <List_261 /> },
  { path: '/modul/layanan-blood-request-item/tambah', module: 'LayananBloodRequestItem', element: <Form_261 /> },
  { path: '/modul/layanan-blood-request-item/:id/edit', module: 'LayananBloodRequestItem', element: <Form_261 /> },
  { path: '/modul/layanan-critical-lab-value', module: 'LayananCriticalLabValue', element: <List_262 /> },
  { path: '/modul/layanan-critical-lab-value/tambah', module: 'LayananCriticalLabValue', element: <Form_262 /> },
  { path: '/modul/layanan-critical-lab-value/:id/edit', module: 'LayananCriticalLabValue', element: <Form_262 /> },
  { path: '/modul/layanan-drug-interaction-check', module: 'LayananDrugInteractionCheck', element: <List_263 /> },
  { path: '/modul/layanan-drug-interaction-check/tambah', module: 'LayananDrugInteractionCheck', element: <Form_263 /> },
  { path: '/modul/layanan-drug-interaction-check/:id/edit', module: 'LayananDrugInteractionCheck', element: <Form_263 /> },
  { path: '/modul/layanan-early-warning-score', module: 'LayananEarlyWarningScore', element: <List_264 /> },
  { path: '/modul/layanan-early-warning-score/tambah', module: 'LayananEarlyWarningScore', element: <Form_264 /> },
  { path: '/modul/layanan-early-warning-score/:id/edit', module: 'LayananEarlyWarningScore', element: <Form_264 /> },
  { path: '/modul/layanan-examination-result-status', module: 'LayananExaminationResultStatus', element: <List_265 /> },
  { path: '/modul/layanan-examination-result-status/tambah', module: 'LayananExaminationResultStatus', element: <Form_265 /> },
  { path: '/modul/layanan-examination-result-status/:id/edit', module: 'LayananExaminationResultStatus', element: <Form_265 /> },
  { path: '/modul/layanan-imaging-order', module: 'LayananImagingOrder', element: <List_266 /> },
  { path: '/modul/layanan-imaging-order/tambah', module: 'LayananImagingOrder', element: <Form_266 /> },
  { path: '/modul/layanan-imaging-order/:id/edit', module: 'LayananImagingOrder', element: <Form_266 /> },
  { path: '/modul/layanan-lab-analyzer-order', module: 'LayananLabAnalyzerOrder', element: <List_267 /> },
  { path: '/modul/layanan-lab-analyzer-order/tambah', module: 'LayananLabAnalyzerOrder', element: <Form_267 /> },
  { path: '/modul/layanan-lab-analyzer-order/:id/edit', module: 'LayananLabAnalyzerOrder', element: <Form_267 /> },
  { path: '/modul/layanan-lab-culture-result', module: 'LayananLabCultureResult', element: <List_268 /> },
  { path: '/modul/layanan-lab-culture-result/tambah', module: 'LayananLabCultureResult', element: <Form_268 /> },
  { path: '/modul/layanan-lab-culture-result/:id/edit', module: 'LayananLabCultureResult', element: <Form_268 /> },
  { path: '/modul/layanan-lab-examination-result', module: 'LayananLabExaminationResult', element: <List_269 /> },
  { path: '/modul/layanan-lab-examination-result/tambah', module: 'LayananLabExaminationResult', element: <Form_269 /> },
  { path: '/modul/layanan-lab-examination-result/:id/edit', module: 'LayananLabExaminationResult', element: <Form_269 /> },
  { path: '/modul/layanan-lab-microscopic-result', module: 'LayananLabMicroscopicResult', element: <List_270 /> },
  { path: '/modul/layanan-lab-microscopic-result/tambah', module: 'LayananLabMicroscopicResult', element: <Form_270 /> },
  { path: '/modul/layanan-lab-microscopic-result/:id/edit', module: 'LayananLabMicroscopicResult', element: <Form_270 /> },
  { path: '/modul/layanan-lab-microscopic-result-item', module: 'LayananLabMicroscopicResultItem', element: <List_271 /> },
  { path: '/modul/layanan-lab-microscopic-result-item/tambah', module: 'LayananLabMicroscopicResultItem', element: <Form_271 /> },
  { path: '/modul/layanan-lab-microscopic-result-item/:id/edit', module: 'LayananLabMicroscopicResultItem', element: <Form_271 /> },
  { path: '/modul/layanan-lab-order', module: 'LayananLabOrder', element: <List_272 /> },
  { path: '/modul/layanan-lab-order/tambah', module: 'LayananLabOrder', element: <Form_272 /> },
  { path: '/modul/layanan-lab-order/:id/edit', module: 'LayananLabOrder', element: <Form_272 /> },
  { path: '/modul/layanan-lab-order-item', module: 'LayananLabOrderItem', element: <List_273 /> },
  { path: '/modul/layanan-lab-order-item/tambah', module: 'LayananLabOrderItem', element: <Form_273 /> },
  { path: '/modul/layanan-lab-order-item/:id/edit', module: 'LayananLabOrderItem', element: <Form_273 /> },
  { path: '/modul/layanan-lab-pcr-result', module: 'LayananLabPcrResult', element: <List_274 /> },
  { path: '/modul/layanan-lab-pcr-result/tambah', module: 'LayananLabPcrResult', element: <Form_274 /> },
  { path: '/modul/layanan-lab-pcr-result/:id/edit', module: 'LayananLabPcrResult', element: <Form_274 /> },
  { path: '/modul/layanan-lab-result', module: 'LayananLabResult', element: <List_275 /> },
  { path: '/modul/layanan-lab-result/tambah', module: 'LayananLabResult', element: <Form_275 /> },
  { path: '/modul/layanan-lab-result/:id/edit', module: 'LayananLabResult', element: <Form_275 /> },
  { path: '/modul/layanan-lab-result-note', module: 'LayananLabResultNote', element: <List_276 /> },
  { path: '/modul/layanan-lab-result-note/tambah', module: 'LayananLabResultNote', element: <Form_276 /> },
  { path: '/modul/layanan-lab-result-note/:id/edit', module: 'LayananLabResultNote', element: <Form_276 /> },
  { path: '/modul/layanan-lab-sensitivity-result', module: 'LayananLabSensitivityResult', element: <List_277 /> },
  { path: '/modul/layanan-lab-sensitivity-result/tambah', module: 'LayananLabSensitivityResult', element: <Form_277 /> },
  { path: '/modul/layanan-lab-sensitivity-result/:id/edit', module: 'LayananLabSensitivityResult', element: <Form_277 /> },
  { path: '/modul/layanan-leftover-medication-voucher', module: 'LayananLeftoverMedicationVoucher', element: <List_278 /> },
  { path: '/modul/layanan-leftover-medication-voucher/tambah', module: 'LayananLeftoverMedicationVoucher', element: <Form_278 /> },
  { path: '/modul/layanan-leftover-medication-voucher/:id/edit', module: 'LayananLeftoverMedicationVoucher', element: <Form_278 /> },
  { path: '/modul/layanan-leftover-medication-voucher-item', module: 'LayananLeftoverMedicationVoucherItem', element: <List_279 /> },
  { path: '/modul/layanan-leftover-medication-voucher-item/tambah', module: 'LayananLeftoverMedicationVoucherItem', element: <Form_279 /> },
  { path: '/modul/layanan-leftover-medication-voucher-item/:id/edit', module: 'LayananLeftoverMedicationVoucherItem', element: <Form_279 /> },
  { path: '/modul/layanan-medical-procedure', module: 'LayananMedicalProcedure', element: <List_280 /> },
  { path: '/modul/layanan-medical-procedure/tambah', module: 'LayananMedicalProcedure', element: <Form_280 /> },
  { path: '/modul/layanan-medical-procedure/:id/edit', module: 'LayananMedicalProcedure', element: <Form_280 /> },
  { path: '/modul/layanan-medical-procedure-staff', module: 'LayananMedicalProcedureStaff', element: <List_281 /> },
  { path: '/modul/layanan-medical-procedure-staff/tambah', module: 'LayananMedicalProcedureStaff', element: <Form_281 /> },
  { path: '/modul/layanan-medical-procedure-staff/:id/edit', module: 'LayananMedicalProcedureStaff', element: <Form_281 /> },
  { path: '/modul/layanan-medical-supply-usage', module: 'LayananMedicalSupplyUsage', element: <List_282 /> },
  { path: '/modul/layanan-medical-supply-usage/tambah', module: 'LayananMedicalSupplyUsage', element: <Form_282 /> },
  { path: '/modul/layanan-medical-supply-usage/:id/edit', module: 'LayananMedicalSupplyUsage', element: <Form_282 /> },
  { path: '/modul/layanan-medical-supply-usage-item', module: 'LayananMedicalSupplyUsageItem', element: <List_283 /> },
  { path: '/modul/layanan-medical-supply-usage-item/tambah', module: 'LayananMedicalSupplyUsageItem', element: <Form_283 /> },
  { path: '/modul/layanan-medical-supply-usage-item/:id/edit', module: 'LayananMedicalSupplyUsageItem', element: <Form_283 /> },
  { path: '/modul/layanan-medication-iteration', module: 'LayananMedicationIteration', element: <List_284 /> },
  { path: '/modul/layanan-medication-iteration/tambah', module: 'LayananMedicationIteration', element: <Form_284 /> },
  { path: '/modul/layanan-medication-iteration/:id/edit', module: 'LayananMedicationIteration', element: <Form_284 /> },
  { path: '/modul/layanan-medication-service-limit', module: 'LayananMedicationServiceLimit', element: <List_285 /> },
  { path: '/modul/layanan-medication-service-limit/tambah', module: 'LayananMedicationServiceLimit', element: <Form_285 /> },
  { path: '/modul/layanan-medication-service-limit/:id/edit', module: 'LayananMedicationServiceLimit', element: <Form_285 /> },
  { path: '/modul/layanan-medicine-delivery', module: 'LayananMedicineDelivery', element: <List_286 /> },
  { path: '/modul/layanan-medicine-delivery/tambah', module: 'LayananMedicineDelivery', element: <Form_286 /> },
  { path: '/modul/layanan-medicine-delivery/:id/edit', module: 'LayananMedicineDelivery', element: <Form_286 /> },
  { path: '/modul/layanan-mortuary-record', module: 'LayananMortuaryRecord', element: <List_287 /> },
  { path: '/modul/layanan-mortuary-record/tambah', module: 'LayananMortuaryRecord', element: <Form_287 /> },
  { path: '/modul/layanan-mortuary-record/:id/edit', module: 'LayananMortuaryRecord', element: <Form_287 /> },
  { path: '/modul/layanan-oxygen-usage', module: 'LayananOxygenUsage', element: <List_288 /> },
  { path: '/modul/layanan-oxygen-usage/tambah', module: 'LayananOxygenUsage', element: <Form_288 /> },
  { path: '/modul/layanan-oxygen-usage/:id/edit', module: 'LayananOxygenUsage', element: <Form_288 /> },
  { path: '/modul/layanan-pathology-anatomy-result', module: 'LayananPathologyAnatomyResult', element: <List_289 /> },
  { path: '/modul/layanan-pathology-anatomy-result/tambah', module: 'LayananPathologyAnatomyResult', element: <Form_289 /> },
  { path: '/modul/layanan-pathology-anatomy-result/:id/edit', module: 'LayananPathologyAnatomyResult', element: <Form_289 /> },
  { path: '/modul/layanan-pathology-immunofluorescence-result', module: 'LayananPathologyImmunofluorescenceResult', element: <List_290 /> },
  { path: '/modul/layanan-pathology-immunofluorescence-result/tambah', module: 'LayananPathologyImmunofluorescenceResult', element: <Form_290 /> },
  { path: '/modul/layanan-pathology-immunofluorescence-result/:id/edit', module: 'LayananPathologyImmunofluorescenceResult', element: <Form_290 /> },
  { path: '/modul/layanan-pathology-molecular-result', module: 'LayananPathologyMolecularResult', element: <List_291 /> },
  { path: '/modul/layanan-pathology-molecular-result/tambah', module: 'LayananPathologyMolecularResult', element: <Form_291 /> },
  { path: '/modul/layanan-pathology-molecular-result/:id/edit', module: 'LayananPathologyMolecularResult', element: <Form_291 /> },
  { path: '/modul/layanan-patient-complaint', module: 'LayananPatientComplaint', element: <List_292 /> },
  { path: '/modul/layanan-patient-complaint/tambah', module: 'LayananPatientComplaint', element: <Form_292 /> },
  { path: '/modul/layanan-patient-complaint/:id/edit', module: 'LayananPatientComplaint', element: <Form_292 /> },
  { path: '/modul/layanan-patient-death-record', module: 'LayananPatientDeathRecord', element: <List_293 /> },
  { path: '/modul/layanan-patient-death-record/tambah', module: 'LayananPatientDeathRecord', element: <Form_293 /> },
  { path: '/modul/layanan-patient-death-record/:id/edit', module: 'LayananPatientDeathRecord', element: <Form_293 /> },
  { path: '/modul/layanan-patient-discharge-record', module: 'LayananPatientDischargeRecord', element: <List_294 /> },
  { path: '/modul/layanan-patient-discharge-record/tambah', module: 'LayananPatientDischargeRecord', element: <Form_294 /> },
  { path: '/modul/layanan-patient-discharge-record/:id/edit', module: 'LayananPatientDischargeRecord', element: <Form_294 /> },
  { path: '/modul/layanan-pharmacy-dispense', module: 'LayananPharmacyDispense', element: <List_295 /> },
  { path: '/modul/layanan-pharmacy-dispense/tambah', module: 'LayananPharmacyDispense', element: <Form_295 /> },
  { path: '/modul/layanan-pharmacy-dispense/:id/edit', module: 'LayananPharmacyDispense', element: <Form_295 /> },
  { path: '/modul/layanan-pharmacy-outpatient-queue', module: 'LayananPharmacyOutpatientQueue', element: <List_296 /> },
  { path: '/modul/layanan-pharmacy-outpatient-queue/tambah', module: 'LayananPharmacyOutpatientQueue', element: <Form_296 /> },
  { path: '/modul/layanan-pharmacy-outpatient-queue/:id/edit', module: 'LayananPharmacyOutpatientQueue', element: <Form_296 /> },
  { path: '/modul/layanan-pharmacy-return', module: 'LayananPharmacyReturn', element: <List_297 /> },
  { path: '/modul/layanan-pharmacy-return/tambah', module: 'LayananPharmacyReturn', element: <Form_297 /> },
  { path: '/modul/layanan-pharmacy-return/:id/edit', module: 'LayananPharmacyReturn', element: <Form_297 /> },
  { path: '/modul/layanan-pharmacy-service-fee', module: 'LayananPharmacyServiceFee', element: <List_298 /> },
  { path: '/modul/layanan-pharmacy-service-fee/tambah', module: 'LayananPharmacyServiceFee', element: <Form_298 /> },
  { path: '/modul/layanan-pharmacy-service-fee/:id/edit', module: 'LayananPharmacyServiceFee', element: <Form_298 /> },
  { path: '/modul/layanan-pharmacy-service-time', module: 'LayananPharmacyServiceTime', element: <List_299 /> },
  { path: '/modul/layanan-pharmacy-service-time/tambah', module: 'LayananPharmacyServiceTime', element: <Form_299 /> },
  { path: '/modul/layanan-pharmacy-service-time/:id/edit', module: 'LayananPharmacyServiceTime', element: <Form_299 /> },
  { path: '/modul/layanan-pharmacy-service-time-stage', module: 'LayananPharmacyServiceTimeStage', element: <List_300 /> },
  { path: '/modul/layanan-pharmacy-service-time-stage/tambah', module: 'LayananPharmacyServiceTimeStage', element: <Form_300 /> },
  { path: '/modul/layanan-pharmacy-service-time-stage/:id/edit', module: 'LayananPharmacyServiceTimeStage', element: <Form_300 /> },
  { path: '/modul/layanan-prescription', module: 'LayananPrescription', element: <List_301 /> },
  { path: '/modul/layanan-prescription/tambah', module: 'LayananPrescription', element: <Form_301 /> },
  { path: '/modul/layanan-prescription/:id/edit', module: 'LayananPrescription', element: <Form_301 /> },
  { path: '/modul/layanan-prescription-fulfillment', module: 'LayananPrescriptionFulfillment', element: <List_302 /> },
  { path: '/modul/layanan-prescription-fulfillment/tambah', module: 'LayananPrescriptionFulfillment', element: <Form_302 /> },
  { path: '/modul/layanan-prescription-fulfillment/:id/edit', module: 'LayananPrescriptionFulfillment', element: <Form_302 /> },
  { path: '/modul/layanan-prescription-fulfillment-item', module: 'LayananPrescriptionFulfillmentItem', element: <List_303 /> },
  { path: '/modul/layanan-prescription-fulfillment-item/tambah', module: 'LayananPrescriptionFulfillmentItem', element: <Form_303 /> },
  { path: '/modul/layanan-prescription-fulfillment-item/:id/edit', module: 'LayananPrescriptionFulfillmentItem', element: <Form_303 /> },
  { path: '/modul/layanan-prescription-initial-review', module: 'LayananPrescriptionInitialReview', element: <List_304 /> },
  { path: '/modul/layanan-prescription-initial-review/tambah', module: 'LayananPrescriptionInitialReview', element: <Form_304 /> },
  { path: '/modul/layanan-prescription-initial-review/:id/edit', module: 'LayananPrescriptionInitialReview', element: <Form_304 /> },
  { path: '/modul/layanan-prescription-item', module: 'LayananPrescriptionItem', element: <List_305 /> },
  { path: '/modul/layanan-prescription-item/tambah', module: 'LayananPrescriptionItem', element: <Form_305 /> },
  { path: '/modul/layanan-prescription-item/:id/edit', module: 'LayananPrescriptionItem', element: <Form_305 /> },
  { path: '/modul/layanan-radiology-order', module: 'LayananRadiologyOrder', element: <List_306 /> },
  { path: '/modul/layanan-radiology-order/tambah', module: 'LayananRadiologyOrder', element: <Form_306 /> },
  { path: '/modul/layanan-radiology-order/:id/edit', module: 'LayananRadiologyOrder', element: <Form_306 /> },
  { path: '/modul/layanan-radiology-order-item', module: 'LayananRadiologyOrderItem', element: <List_307 /> },
  { path: '/modul/layanan-radiology-order-item/tambah', module: 'LayananRadiologyOrderItem', element: <Form_307 /> },
  { path: '/modul/layanan-radiology-order-item/:id/edit', module: 'LayananRadiologyOrderItem', element: <Form_307 /> },
  { path: '/modul/layanan-radiology-result', module: 'LayananRadiologyResult', element: <List_308 /> },
  { path: '/modul/layanan-radiology-result/tambah', module: 'LayananRadiologyResult', element: <Form_308 /> },
  { path: '/modul/layanan-radiology-result/:id/edit', module: 'LayananRadiologyResult', element: <Form_308 /> },
  { path: '/modul/layanan-radiology-viewer-log', module: 'LayananRadiologyViewerLog', element: <List_309 /> },
  { path: '/modul/layanan-radiology-viewer-log/tambah', module: 'LayananRadiologyViewerLog', element: <Form_309 /> },
  { path: '/modul/layanan-radiology-viewer-log/:id/edit', module: 'LayananRadiologyViewerLog', element: <Form_309 /> },
  { path: '/modul/layanan-surgical-safety-evaluation-result', module: 'LayananSurgicalSafetyEvaluationResult', element: <List_310 /> },
  { path: '/modul/layanan-surgical-safety-evaluation-result/tambah', module: 'LayananSurgicalSafetyEvaluationResult', element: <Form_310 /> },
  { path: '/modul/layanan-surgical-safety-evaluation-result/:id/edit', module: 'LayananSurgicalSafetyEvaluationResult', element: <Form_310 /> },
  { path: '/modul/layanan-telemedicine-session', module: 'LayananTelemedicineSession', element: <List_311 /> },
  { path: '/modul/layanan-telemedicine-session/tambah', module: 'LayananTelemedicineSession', element: <Form_311 /> },
  { path: '/modul/layanan-telemedicine-session/:id/edit', module: 'LayananTelemedicineSession', element: <Form_311 /> },
  { path: '/modul/layanan-treatment-protocol', module: 'LayananTreatmentProtocol', element: <List_312 /> },
  { path: '/modul/layanan-treatment-protocol/tambah', module: 'LayananTreatmentProtocol', element: <Form_312 /> },
  { path: '/modul/layanan-treatment-protocol/:id/edit', module: 'LayananTreatmentProtocol', element: <Form_312 /> },
  { path: '/modul/layanan-treatment-protocol-step', module: 'LayananTreatmentProtocolStep', element: <List_313 /> },
  { path: '/modul/layanan-treatment-protocol-step/tambah', module: 'LayananTreatmentProtocolStep', element: <Form_313 /> },
  { path: '/modul/layanan-treatment-protocol-step/:id/edit', module: 'LayananTreatmentProtocolStep', element: <Form_313 /> },
  { path: '/modul/layanan-treatment-protocol-step-drug', module: 'LayananTreatmentProtocolStepDrug', element: <List_314 /> },
  { path: '/modul/layanan-treatment-protocol-step-drug/tambah', module: 'LayananTreatmentProtocolStepDrug', element: <Form_314 /> },
  { path: '/modul/layanan-treatment-protocol-step-drug/:id/edit', module: 'LayananTreatmentProtocolStepDrug', element: <Form_314 /> },
  { path: '/modul/medical-record-abci-procedure', module: 'MedicalRecordAbciProcedure', element: <List_315 /> },
  { path: '/modul/medical-record-abci-procedure/tambah', module: 'MedicalRecordAbciProcedure', element: <Form_315 /> },
  { path: '/modul/medical-record-abci-procedure/:id/edit', module: 'MedicalRecordAbciProcedure', element: <Form_315 /> },
  { path: '/modul/medical-record-abdomen-examination', module: 'MedicalRecordAbdomenExamination', element: <List_316 /> },
  { path: '/modul/medical-record-abdomen-examination/tambah', module: 'MedicalRecordAbdomenExamination', element: <Form_316 /> },
  { path: '/modul/medical-record-abdomen-examination/:id/edit', module: 'MedicalRecordAbdomenExamination', element: <Form_316 /> },
  { path: '/modul/medical-record-admission-medication-reconciliation', module: 'MedicalRecordAdmissionMedicationReconciliation', element: <List_317 /> },
  { path: '/modul/medical-record-admission-medication-reconciliation/tambah', module: 'MedicalRecordAdmissionMedicationReconciliation', element: <Form_317 /> },
  { path: '/modul/medical-record-admission-medication-reconciliation/:id/edit', module: 'MedicalRecordAdmissionMedicationReconciliation', element: <Form_317 /> },
  { path: '/modul/medical-record-admission-medication-reconciliation-item', module: 'MedicalRecordAdmissionMedicationReconciliationItem', element: <List_318 /> },
  { path: '/modul/medical-record-admission-medication-reconciliation-item/tambah', module: 'MedicalRecordAdmissionMedicationReconciliationItem', element: <Form_318 /> },
  { path: '/modul/medical-record-admission-medication-reconciliation-item/:id/edit', module: 'MedicalRecordAdmissionMedicationReconciliationItem', element: <Form_318 /> },
  { path: '/modul/medical-record-allergy', module: 'MedicalRecordAllergy', element: <List_319 /> },
  { path: '/modul/medical-record-allergy/tambah', module: 'MedicalRecordAllergy', element: <Form_319 /> },
  { path: '/modul/medical-record-allergy/:id/edit', module: 'MedicalRecordAllergy', element: <Form_319 /> },
  { path: '/modul/medical-record-anal-examination', module: 'MedicalRecordAnalExamination', element: <List_320 /> },
  { path: '/modul/medical-record-anal-examination/tambah', module: 'MedicalRecordAnalExamination', element: <Form_320 /> },
  { path: '/modul/medical-record-anal-examination/:id/edit', module: 'MedicalRecordAnalExamination', element: <Form_320 /> },
  { path: '/modul/medical-record-anamnesis', module: 'MedicalRecordAnamnesis', element: <List_321 /> },
  { path: '/modul/medical-record-anamnesis/tambah', module: 'MedicalRecordAnamnesis', element: <Form_321 /> },
  { path: '/modul/medical-record-anamnesis/:id/edit', module: 'MedicalRecordAnamnesis', element: <Form_321 /> },
  { path: '/modul/medical-record-anamnesis-source', module: 'MedicalRecordAnamnesisSource', element: <List_322 /> },
  { path: '/modul/medical-record-anamnesis-source/tambah', module: 'MedicalRecordAnamnesisSource', element: <Form_322 /> },
  { path: '/modul/medical-record-anamnesis-source/:id/edit', module: 'MedicalRecordAnamnesisSource', element: <Form_322 /> },
  { path: '/modul/medical-record-anesthesia-preparation', module: 'MedicalRecordAnesthesiaPreparation', element: <List_323 /> },
  { path: '/modul/medical-record-anesthesia-preparation/tambah', module: 'MedicalRecordAnesthesiaPreparation', element: <Form_323 /> },
  { path: '/modul/medical-record-anesthesia-preparation/:id/edit', module: 'MedicalRecordAnesthesiaPreparation', element: <Form_323 /> },
  { path: '/modul/medical-record-back-examination', module: 'MedicalRecordBackExamination', element: <List_324 /> },
  { path: '/modul/medical-record-back-examination/tambah', module: 'MedicalRecordBackExamination', element: <Form_324 /> },
  { path: '/modul/medical-record-back-examination/:id/edit', module: 'MedicalRecordBackExamination', element: <Form_324 /> },
  { path: '/modul/medical-record-baep-anxiety-detail', module: 'MedicalRecordBaepAnxietyDetail', element: <List_325 /> },
  { path: '/modul/medical-record-baep-anxiety-detail/tambah', module: 'MedicalRecordBaepAnxietyDetail', element: <Form_325 /> },
  { path: '/modul/medical-record-baep-anxiety-detail/:id/edit', module: 'MedicalRecordBaepAnxietyDetail', element: <Form_325 /> },
  { path: '/modul/medical-record-baep-cognitive-detail', module: 'MedicalRecordBaepCognitiveDetail', element: <List_326 /> },
  { path: '/modul/medical-record-baep-cognitive-detail/tambah', module: 'MedicalRecordBaepCognitiveDetail', element: <Form_326 /> },
  { path: '/modul/medical-record-baep-cognitive-detail/:id/edit', module: 'MedicalRecordBaepCognitiveDetail', element: <Form_326 /> },
  { path: '/modul/medical-record-baep-depression-detail', module: 'MedicalRecordBaepDepressionDetail', element: <List_327 /> },
  { path: '/modul/medical-record-baep-depression-detail/tambah', module: 'MedicalRecordBaepDepressionDetail', element: <Form_327 /> },
  { path: '/modul/medical-record-baep-depression-detail/:id/edit', module: 'MedicalRecordBaepDepressionDetail', element: <Form_327 /> },
  { path: '/modul/medical-record-baep-dysphagia-detail', module: 'MedicalRecordBaepDysphagiaDetail', element: <List_328 /> },
  { path: '/modul/medical-record-baep-dysphagia-detail/tambah', module: 'MedicalRecordBaepDysphagiaDetail', element: <Form_328 /> },
  { path: '/modul/medical-record-baep-dysphagia-detail/:id/edit', module: 'MedicalRecordBaepDysphagiaDetail', element: <Form_328 /> },
  { path: '/modul/medical-record-baep-insomnia-detail', module: 'MedicalRecordBaepInsomniaDetail', element: <List_329 /> },
  { path: '/modul/medical-record-baep-insomnia-detail/tambah', module: 'MedicalRecordBaepInsomniaDetail', element: <Form_329 /> },
  { path: '/modul/medical-record-baep-insomnia-detail/:id/edit', module: 'MedicalRecordBaepInsomniaDetail', element: <Form_329 /> },
  { path: '/modul/medical-record-baep-intervention-protocol', module: 'MedicalRecordBaepInterventionProtocol', element: <List_330 /> },
  { path: '/modul/medical-record-baep-intervention-protocol/tambah', module: 'MedicalRecordBaepInterventionProtocol', element: <Form_330 /> },
  { path: '/modul/medical-record-baep-intervention-protocol/:id/edit', module: 'MedicalRecordBaepInterventionProtocol', element: <Form_330 /> },
  { path: '/modul/medical-record-baep-motor-detail', module: 'MedicalRecordBaepMotorDetail', element: <List_331 /> },
  { path: '/modul/medical-record-baep-motor-detail/tambah', module: 'MedicalRecordBaepMotorDetail', element: <Form_331 /> },
  { path: '/modul/medical-record-baep-motor-detail/:id/edit', module: 'MedicalRecordBaepMotorDetail', element: <Form_331 /> },
  { path: '/modul/medical-record-baep-sensory-detail', module: 'MedicalRecordBaepSensoryDetail', element: <List_332 /> },
  { path: '/modul/medical-record-baep-sensory-detail/tambah', module: 'MedicalRecordBaepSensoryDetail', element: <Form_332 /> },
  { path: '/modul/medical-record-baep-sensory-detail/:id/edit', module: 'MedicalRecordBaepSensoryDetail', element: <Form_332 /> },
  { path: '/modul/medical-record-baep-stimulation-protocol-detail', module: 'MedicalRecordBaepStimulationProtocolDetail', element: <List_333 /> },
  { path: '/modul/medical-record-baep-stimulation-protocol-detail/tambah', module: 'MedicalRecordBaepStimulationProtocolDetail', element: <Form_333 /> },
  { path: '/modul/medical-record-baep-stimulation-protocol-detail/:id/edit', module: 'MedicalRecordBaepStimulationProtocolDetail', element: <Form_333 /> },
  { path: '/modul/medical-record-barthel-index-assessment', module: 'MedicalRecordBarthelIndexAssessment', element: <List_334 /> },
  { path: '/modul/medical-record-barthel-index-assessment/tambah', module: 'MedicalRecordBarthelIndexAssessment', element: <Form_334 /> },
  { path: '/modul/medical-record-barthel-index-assessment/:id/edit', module: 'MedicalRecordBarthelIndexAssessment', element: <Form_334 /> },
  { path: '/modul/medical-record-birth-certificate-letter', module: 'MedicalRecordBirthCertificateLetter', element: <List_335 /> },
  { path: '/modul/medical-record-birth-certificate-letter/tambah', module: 'MedicalRecordBirthCertificateLetter', element: <Form_335 /> },
  { path: '/modul/medical-record-birth-certificate-letter/:id/edit', module: 'MedicalRecordBirthCertificateLetter', element: <Form_335 /> },
  { path: '/modul/medical-record-blood-transfusion', module: 'MedicalRecordBloodTransfusion', element: <List_336 /> },
  { path: '/modul/medical-record-blood-transfusion/tambah', module: 'MedicalRecordBloodTransfusion', element: <Form_336 /> },
  { path: '/modul/medical-record-blood-transfusion/:id/edit', module: 'MedicalRecordBloodTransfusion', element: <Form_336 /> },
  { path: '/modul/medical-record-blood-transfusion-detail', module: 'MedicalRecordBloodTransfusionDetail', element: <List_337 /> },
  { path: '/modul/medical-record-blood-transfusion-detail/tambah', module: 'MedicalRecordBloodTransfusionDetail', element: <Form_337 /> },
  { path: '/modul/medical-record-blood-transfusion-detail/:id/edit', module: 'MedicalRecordBloodTransfusionDetail', element: <Form_337 /> },
  { path: '/modul/medical-record-blood-transfusion-observation', module: 'MedicalRecordBloodTransfusionObservation', element: <List_338 /> },
  { path: '/modul/medical-record-blood-transfusion-observation/tambah', module: 'MedicalRecordBloodTransfusionObservation', element: <Form_338 /> },
  { path: '/modul/medical-record-blood-transfusion-observation/:id/edit', module: 'MedicalRecordBloodTransfusionObservation', element: <Form_338 /> },
  { path: '/modul/medical-record-breast-examination', module: 'MedicalRecordBreastExamination', element: <List_339 /> },
  { path: '/modul/medical-record-breast-examination/tambah', module: 'MedicalRecordBreastExamination', element: <Form_339 /> },
  { path: '/modul/medical-record-breast-examination/:id/edit', module: 'MedicalRecordBreastExamination', element: <Form_339 /> },
  { path: '/modul/medical-record-case-manager-assessment', module: 'MedicalRecordCaseManagerAssessment', element: <List_340 /> },
  { path: '/modul/medical-record-case-manager-assessment/tambah', module: 'MedicalRecordCaseManagerAssessment', element: <Form_340 /> },
  { path: '/modul/medical-record-case-manager-assessment/:id/edit', module: 'MedicalRecordCaseManagerAssessment', element: <Form_340 /> },
  { path: '/modul/medical-record-cat-clams-examination', module: 'MedicalRecordCatClamsExamination', element: <List_341 /> },
  { path: '/modul/medical-record-cat-clams-examination/tambah', module: 'MedicalRecordCatClamsExamination', element: <Form_341 /> },
  { path: '/modul/medical-record-cat-clams-examination/:id/edit', module: 'MedicalRecordCatClamsExamination', element: <Form_341 /> },
  { path: '/modul/medical-record-chest-examination', module: 'MedicalRecordChestExamination', element: <List_342 /> },
  { path: '/modul/medical-record-chest-examination/tambah', module: 'MedicalRecordChestExamination', element: <Form_342 /> },
  { path: '/modul/medical-record-chest-examination/:id/edit', module: 'MedicalRecordChestExamination', element: <Form_342 /> },
  { path: '/modul/medical-record-chief-complaint', module: 'MedicalRecordChiefComplaint', element: <List_343 /> },
  { path: '/modul/medical-record-chief-complaint/tambah', module: 'MedicalRecordChiefComplaint', element: <Form_343 /> },
  { path: '/modul/medical-record-chief-complaint/:id/edit', module: 'MedicalRecordChiefComplaint', element: <Form_343 /> },
  { path: '/modul/medical-record-clinical-note', module: 'MedicalRecordClinicalNote', element: <List_344 /> },
  { path: '/modul/medical-record-clinical-note/tambah', module: 'MedicalRecordClinicalNote', element: <Form_344 /> },
  { path: '/modul/medical-record-clinical-note/:id/edit', module: 'MedicalRecordClinicalNote', element: <Form_344 /> },
  { path: '/modul/medical-record-clinical-note-co-management', module: 'MedicalRecordClinicalNoteCoManagement', element: <List_345 /> },
  { path: '/modul/medical-record-clinical-note-co-management/tambah', module: 'MedicalRecordClinicalNoteCoManagement', element: <Form_345 /> },
  { path: '/modul/medical-record-clinical-note-co-management/:id/edit', module: 'MedicalRecordClinicalNoteCoManagement', element: <Form_345 /> },
  { path: '/modul/medical-record-clinical-note-verification', module: 'MedicalRecordClinicalNoteVerification', element: <List_346 /> },
  { path: '/modul/medical-record-clinical-note-verification/tambah', module: 'MedicalRecordClinicalNoteVerification', element: <Form_346 /> },
  { path: '/modul/medical-record-clinical-note-verification/:id/edit', module: 'MedicalRecordClinicalNoteVerification', element: <Form_346 /> },
  { path: '/modul/medical-record-control-schedule', module: 'MedicalRecordControlSchedule', element: <List_347 /> },
  { path: '/modul/medical-record-control-schedule/tambah', module: 'MedicalRecordControlSchedule', element: <Form_347 /> },
  { path: '/modul/medical-record-control-schedule/:id/edit', module: 'MedicalRecordControlSchedule', element: <Form_347 /> },
  { path: '/modul/medical-record-cough-assessment', module: 'MedicalRecordCoughAssessment', element: <List_348 /> },
  { path: '/modul/medical-record-cough-assessment/tambah', module: 'MedicalRecordCoughAssessment', element: <Form_348 /> },
  { path: '/modul/medical-record-cough-assessment/:id/edit', module: 'MedicalRecordCoughAssessment', element: <Form_348 /> },
  { path: '/modul/medical-record-dental-examination', module: 'MedicalRecordDentalExamination', element: <List_349 /> },
  { path: '/modul/medical-record-dental-examination/tambah', module: 'MedicalRecordDentalExamination', element: <Form_349 /> },
  { path: '/modul/medical-record-dental-examination/:id/edit', module: 'MedicalRecordDentalExamination', element: <Form_349 /> },
  { path: '/modul/medical-record-diagnosis', module: 'MedicalRecordDiagnosis', element: <List_350 /> },
  { path: '/modul/medical-record-diagnosis/tambah', module: 'MedicalRecordDiagnosis', element: <Form_350 /> },
  { path: '/modul/medical-record-diagnosis/:id/edit', module: 'MedicalRecordDiagnosis', element: <Form_350 /> },
  { path: '/modul/medical-record-diagnosis-indicator-mapping', module: 'MedicalRecordDiagnosisIndicatorMapping', element: <List_351 /> },
  { path: '/modul/medical-record-diagnosis-indicator-mapping/tambah', module: 'MedicalRecordDiagnosisIndicatorMapping', element: <Form_351 /> },
  { path: '/modul/medical-record-diagnosis-indicator-mapping/:id/edit', module: 'MedicalRecordDiagnosisIndicatorMapping', element: <Form_351 /> },
  { path: '/modul/medical-record-differential-diagnosis', module: 'MedicalRecordDifferentialDiagnosis', element: <List_352 /> },
  { path: '/modul/medical-record-differential-diagnosis/tambah', module: 'MedicalRecordDifferentialDiagnosis', element: <Form_352 /> },
  { path: '/modul/medical-record-differential-diagnosis/:id/edit', module: 'MedicalRecordDifferentialDiagnosis', element: <Form_352 /> },
  { path: '/modul/medical-record-discharge-medication-reconciliation', module: 'MedicalRecordDischargeMedicationReconciliation', element: <List_353 /> },
  { path: '/modul/medical-record-discharge-medication-reconciliation/tambah', module: 'MedicalRecordDischargeMedicationReconciliation', element: <Form_353 /> },
  { path: '/modul/medical-record-discharge-medication-reconciliation/:id/edit', module: 'MedicalRecordDischargeMedicationReconciliation', element: <Form_353 /> },
  { path: '/modul/medical-record-discharge-medication-reconciliation-item', module: 'MedicalRecordDischargeMedicationReconciliationItem', element: <List_354 /> },
  { path: '/modul/medical-record-discharge-medication-reconciliation-item/tambah', module: 'MedicalRecordDischargeMedicationReconciliationItem', element: <Form_354 /> },
  { path: '/modul/medical-record-discharge-medication-reconciliation-item/:id/edit', module: 'MedicalRecordDischargeMedicationReconciliationItem', element: <Form_354 /> },
  { path: '/modul/medical-record-discharge-planning-risk-factor', module: 'MedicalRecordDischargePlanningRiskFactor', element: <List_355 /> },
  { path: '/modul/medical-record-discharge-planning-risk-factor/tambah', module: 'MedicalRecordDischargePlanningRiskFactor', element: <Form_355 /> },
  { path: '/modul/medical-record-discharge-planning-risk-factor/:id/edit', module: 'MedicalRecordDischargePlanningRiskFactor', element: <Form_355 /> },
  { path: '/modul/medical-record-discharge-planning-screening', module: 'MedicalRecordDischargePlanningScreening', element: <List_356 /> },
  { path: '/modul/medical-record-discharge-planning-screening/tambah', module: 'MedicalRecordDischargePlanningScreening', element: <Form_356 /> },
  { path: '/modul/medical-record-discharge-planning-screening/:id/edit', module: 'MedicalRecordDischargePlanningScreening', element: <Form_356 /> },
  { path: '/modul/medical-record-discharge-summary', module: 'MedicalRecordDischargeSummary', element: <List_357 /> },
  { path: '/modul/medical-record-discharge-summary/tambah', module: 'MedicalRecordDischargeSummary', element: <Form_357 /> },
  { path: '/modul/medical-record-discharge-summary/:id/edit', module: 'MedicalRecordDischargeSummary', element: <Form_357 /> },
  { path: '/modul/medical-record-doctor-procedure-consent', module: 'MedicalRecordDoctorProcedureConsent', element: <List_358 /> },
  { path: '/modul/medical-record-doctor-procedure-consent/tambah', module: 'MedicalRecordDoctorProcedureConsent', element: <Form_358 /> },
  { path: '/modul/medical-record-doctor-procedure-consent/:id/edit', module: 'MedicalRecordDoctorProcedureConsent', element: <Form_358 /> },
  { path: '/modul/medical-record-document-upload', module: 'MedicalRecordDocumentUpload', element: <List_359 /> },
  { path: '/modul/medical-record-document-upload/tambah', module: 'MedicalRecordDocumentUpload', element: <Form_359 /> },
  { path: '/modul/medical-record-document-upload/:id/edit', module: 'MedicalRecordDocumentUpload', element: <Form_359 /> },
  { path: '/modul/medical-record-ear-examination', module: 'MedicalRecordEarExamination', element: <List_360 /> },
  { path: '/modul/medical-record-ear-examination/tambah', module: 'MedicalRecordEarExamination', element: <Form_360 /> },
  { path: '/modul/medical-record-ear-examination/:id/edit', module: 'MedicalRecordEarExamination', element: <Form_360 /> },
  { path: '/modul/medical-record-eeg-examination', module: 'MedicalRecordEegExamination', element: <List_361 /> },
  { path: '/modul/medical-record-eeg-examination/tambah', module: 'MedicalRecordEegExamination', element: <Form_361 /> },
  { path: '/modul/medical-record-eeg-examination/:id/edit', module: 'MedicalRecordEegExamination', element: <Form_361 /> },
  { path: '/modul/medical-record-ekg-examination', module: 'MedicalRecordEkgExamination', element: <List_362 /> },
  { path: '/modul/medical-record-ekg-examination/tambah', module: 'MedicalRecordEkgExamination', element: <Form_362 /> },
  { path: '/modul/medical-record-ekg-examination/:id/edit', module: 'MedicalRecordEkgExamination', element: <Form_362 /> },
  { path: '/modul/medical-record-emergency-education', module: 'MedicalRecordEmergencyEducation', element: <List_363 /> },
  { path: '/modul/medical-record-emergency-education/tambah', module: 'MedicalRecordEmergencyEducation', element: <Form_363 /> },
  { path: '/modul/medical-record-emergency-education/:id/edit', module: 'MedicalRecordEmergencyEducation', element: <Form_363 /> },
  { path: '/modul/medical-record-emg-examination', module: 'MedicalRecordEmgExamination', element: <List_364 /> },
  { path: '/modul/medical-record-emg-examination/tambah', module: 'MedicalRecordEmgExamination', element: <Form_364 /> },
  { path: '/modul/medical-record-emg-examination/:id/edit', module: 'MedicalRecordEmgExamination', element: <Form_364 /> },
  { path: '/modul/medical-record-end-of-life-education', module: 'MedicalRecordEndOfLifeEducation', element: <List_365 /> },
  { path: '/modul/medical-record-end-of-life-education/tambah', module: 'MedicalRecordEndOfLifeEducation', element: <Form_365 /> },
  { path: '/modul/medical-record-end-of-life-education/:id/edit', module: 'MedicalRecordEndOfLifeEducation', element: <Form_365 /> },
  { path: '/modul/medical-record-end-of-life-psychosocial-relationship', module: 'MedicalRecordEndOfLifePsychosocialRelationship', element: <List_366 /> },
  { path: '/modul/medical-record-end-of-life-psychosocial-relationship/tambah', module: 'MedicalRecordEndOfLifePsychosocialRelationship', element: <Form_366 /> },
  { path: '/modul/medical-record-end-of-life-psychosocial-relationship/:id/edit', module: 'MedicalRecordEndOfLifePsychosocialRelationship', element: <Form_366 /> },
  { path: '/modul/medical-record-epfra-assessment', module: 'MedicalRecordEpfraAssessment', element: <List_367 /> },
  { path: '/modul/medical-record-epfra-assessment/tambah', module: 'MedicalRecordEpfraAssessment', element: <Form_367 /> },
  { path: '/modul/medical-record-epfra-assessment/:id/edit', module: 'MedicalRecordEpfraAssessment', element: <Form_367 /> },
  { path: '/modul/medical-record-examination-type', module: 'MedicalRecordExaminationType', element: <List_368 /> },
  { path: '/modul/medical-record-examination-type/tambah', module: 'MedicalRecordExaminationType', element: <Form_368 /> },
  { path: '/modul/medical-record-examination-type/:id/edit', module: 'MedicalRecordExaminationType', element: <Form_368 /> },
  { path: '/modul/medical-record-external-risk-factor', module: 'MedicalRecordExternalRiskFactor', element: <List_369 /> },
  { path: '/modul/medical-record-external-risk-factor/tambah', module: 'MedicalRecordExternalRiskFactor', element: <Form_369 /> },
  { path: '/modul/medical-record-external-risk-factor/:id/edit', module: 'MedicalRecordExternalRiskFactor', element: <Form_369 /> },
  { path: '/modul/medical-record-eye-exam-document-upload', module: 'MedicalRecordEyeExamDocumentUpload', element: <List_370 /> },
  { path: '/modul/medical-record-eye-exam-document-upload/tambah', module: 'MedicalRecordEyeExamDocumentUpload', element: <Form_370 /> },
  { path: '/modul/medical-record-eye-exam-document-upload/:id/edit', module: 'MedicalRecordEyeExamDocumentUpload', element: <Form_370 /> },
  { path: '/modul/medical-record-eye-examination', module: 'MedicalRecordEyeExamination', element: <List_371 /> },
  { path: '/modul/medical-record-eye-examination/tambah', module: 'MedicalRecordEyeExamination', element: <Form_371 /> },
  { path: '/modul/medical-record-eye-examination/:id/edit', module: 'MedicalRecordEyeExamination', element: <Form_371 /> },
  { path: '/modul/medical-record-family-medical-history', module: 'MedicalRecordFamilyMedicalHistory', element: <List_372 /> },
  { path: '/modul/medical-record-family-medical-history/tambah', module: 'MedicalRecordFamilyMedicalHistory', element: <Form_372 /> },
  { path: '/modul/medical-record-family-medical-history/:id/edit', module: 'MedicalRecordFamilyMedicalHistory', element: <Form_372 /> },
  { path: '/modul/medical-record-family-planning-obstetrics', module: 'MedicalRecordFamilyPlanningObstetrics', element: <List_373 /> },
  { path: '/modul/medical-record-family-planning-obstetrics/tambah', module: 'MedicalRecordFamilyPlanningObstetrics', element: <Form_373 /> },
  { path: '/modul/medical-record-family-planning-obstetrics/:id/edit', module: 'MedicalRecordFamilyPlanningObstetrics', element: <Form_373 /> },
  { path: '/modul/medical-record-fibroscan-result', module: 'MedicalRecordFibroscanResult', element: <List_374 /> },
  { path: '/modul/medical-record-fibroscan-result/tambah', module: 'MedicalRecordFibroscanResult', element: <Form_374 /> },
  { path: '/modul/medical-record-fibroscan-result/:id/edit', module: 'MedicalRecordFibroscanResult', element: <Form_374 /> },
  { path: '/modul/medical-record-finger-examination', module: 'MedicalRecordFingerExamination', element: <List_375 /> },
  { path: '/modul/medical-record-finger-examination/tambah', module: 'MedicalRecordFingerExamination', element: <Form_375 /> },
  { path: '/modul/medical-record-finger-examination/:id/edit', module: 'MedicalRecordFingerExamination', element: <Form_375 /> },
  { path: '/modul/medical-record-fingernail-examination', module: 'MedicalRecordFingernailExamination', element: <List_376 /> },
  { path: '/modul/medical-record-fingernail-examination/tambah', module: 'MedicalRecordFingernailExamination', element: <Form_376 /> },
  { path: '/modul/medical-record-fingernail-examination/:id/edit', module: 'MedicalRecordFingernailExamination', element: <Form_376 /> },
  { path: '/modul/medical-record-fluid-balance-assessment', module: 'MedicalRecordFluidBalanceAssessment', element: <List_377 /> },
  { path: '/modul/medical-record-fluid-balance-assessment/tambah', module: 'MedicalRecordFluidBalanceAssessment', element: <Form_377 /> },
  { path: '/modul/medical-record-fluid-balance-assessment/:id/edit', module: 'MedicalRecordFluidBalanceAssessment', element: <Form_377 /> },
  { path: '/modul/medical-record-fluid-balance-assessment-detail', module: 'MedicalRecordFluidBalanceAssessmentDetail', element: <List_378 /> },
  { path: '/modul/medical-record-fluid-balance-assessment-detail/tambah', module: 'MedicalRecordFluidBalanceAssessmentDetail', element: <Form_378 /> },
  { path: '/modul/medical-record-fluid-balance-assessment-detail/:id/edit', module: 'MedicalRecordFluidBalanceAssessmentDetail', element: <Form_378 /> },
  { path: '/modul/medical-record-fluid-final-balance', module: 'MedicalRecordFluidFinalBalance', element: <List_379 /> },
  { path: '/modul/medical-record-fluid-final-balance/tambah', module: 'MedicalRecordFluidFinalBalance', element: <Form_379 /> },
  { path: '/modul/medical-record-fluid-final-balance/:id/edit', module: 'MedicalRecordFluidFinalBalance', element: <Form_379 /> },
  { path: '/modul/medical-record-food-allergen-examination', module: 'MedicalRecordFoodAllergenExamination', element: <List_380 /> },
  { path: '/modul/medical-record-food-allergen-examination/tambah', module: 'MedicalRecordFoodAllergenExamination', element: <Form_380 /> },
  { path: '/modul/medical-record-food-allergen-examination/:id/edit', module: 'MedicalRecordFoodAllergenExamination', element: <Form_380 /> },
  { path: '/modul/medical-record-forearm-examination', module: 'MedicalRecordForearmExamination', element: <List_381 /> },
  { path: '/modul/medical-record-forearm-examination/tambah', module: 'MedicalRecordForearmExamination', element: <Form_381 /> },
  { path: '/modul/medical-record-forearm-examination/:id/edit', module: 'MedicalRecordForearmExamination', element: <Form_381 /> },
  { path: '/modul/medical-record-functional-assessment', module: 'MedicalRecordFunctionalAssessment', element: <List_382 /> },
  { path: '/modul/medical-record-functional-assessment/tambah', module: 'MedicalRecordFunctionalAssessment', element: <Form_382 /> },
  { path: '/modul/medical-record-functional-assessment/:id/edit', module: 'MedicalRecordFunctionalAssessment', element: <Form_382 /> },
  { path: '/modul/medical-record-functional-status-assessment', module: 'MedicalRecordFunctionalStatusAssessment', element: <List_383 /> },
  { path: '/modul/medical-record-functional-status-assessment/tambah', module: 'MedicalRecordFunctionalStatusAssessment', element: <Form_383 /> },
  { path: '/modul/medical-record-functional-status-assessment/:id/edit', module: 'MedicalRecordFunctionalStatusAssessment', element: <Form_383 /> },
  { path: '/modul/medical-record-general-examination', module: 'MedicalRecordGeneralExamination', element: <List_384 /> },
  { path: '/modul/medical-record-general-examination/tambah', module: 'MedicalRecordGeneralExamination', element: <Form_384 /> },
  { path: '/modul/medical-record-general-examination/:id/edit', module: 'MedicalRecordGeneralExamination', element: <Form_384 /> },
  { path: '/modul/medical-record-genital-examination', module: 'MedicalRecordGenitalExamination', element: <List_385 /> },
  { path: '/modul/medical-record-genital-examination/tambah', module: 'MedicalRecordGenitalExamination', element: <Form_385 /> },
  { path: '/modul/medical-record-genital-examination/:id/edit', module: 'MedicalRecordGenitalExamination', element: <Form_385 /> },
  { path: '/modul/medical-record-get-up-and-go-test-assessment', module: 'MedicalRecordGetUpAndGoTestAssessment', element: <List_386 /> },
  { path: '/modul/medical-record-get-up-and-go-test-assessment/tambah', module: 'MedicalRecordGetUpAndGoTestAssessment', element: <Form_386 /> },
  { path: '/modul/medical-record-get-up-and-go-test-assessment/:id/edit', module: 'MedicalRecordGetUpAndGoTestAssessment', element: <Form_386 /> },
  { path: '/modul/medical-record-grace-risk-score-assessment', module: 'MedicalRecordGraceRiskScoreAssessment', element: <List_387 /> },
  { path: '/modul/medical-record-grace-risk-score-assessment/tambah', module: 'MedicalRecordGraceRiskScoreAssessment', element: <Form_387 /> },
  { path: '/modul/medical-record-grace-risk-score-assessment/:id/edit', module: 'MedicalRecordGraceRiskScoreAssessment', element: <Form_387 /> },
  { path: '/modul/medical-record-gynecology-history', module: 'MedicalRecordGynecologyHistory', element: <List_388 /> },
  { path: '/modul/medical-record-gynecology-history/tambah', module: 'MedicalRecordGynecologyHistory', element: <Form_388 /> },
  { path: '/modul/medical-record-gynecology-history/:id/edit', module: 'MedicalRecordGynecologyHistory', element: <Form_388 /> },
  { path: '/modul/medical-record-gynecology-ultrasound', module: 'MedicalRecordGynecologyUltrasound', element: <List_389 /> },
  { path: '/modul/medical-record-gynecology-ultrasound/tambah', module: 'MedicalRecordGynecologyUltrasound', element: <Form_389 /> },
  { path: '/modul/medical-record-gynecology-ultrasound/:id/edit', module: 'MedicalRecordGynecologyUltrasound', element: <Form_389 /> },
  { path: '/modul/medical-record-hair-examination', module: 'MedicalRecordHairExamination', element: <List_390 /> },
  { path: '/modul/medical-record-hair-examination/tambah', module: 'MedicalRecordHairExamination', element: <Form_390 /> },
  { path: '/modul/medical-record-hair-examination/:id/edit', module: 'MedicalRecordHairExamination', element: <Form_390 /> },
  { path: '/modul/medical-record-hand-joint-examination', module: 'MedicalRecordHandJointExamination', element: <List_391 /> },
  { path: '/modul/medical-record-hand-joint-examination/tambah', module: 'MedicalRecordHandJointExamination', element: <Form_391 /> },
  { path: '/modul/medical-record-hand-joint-examination/:id/edit', module: 'MedicalRecordHandJointExamination', element: <Form_391 /> },
  { path: '/modul/medical-record-head-examination', module: 'MedicalRecordHeadExamination', element: <List_392 /> },
  { path: '/modul/medical-record-head-examination/tambah', module: 'MedicalRecordHeadExamination', element: <Form_392 /> },
  { path: '/modul/medical-record-head-examination/:id/edit', module: 'MedicalRecordHeadExamination', element: <Form_392 /> },
  { path: '/modul/medical-record-health-certificate', module: 'MedicalRecordHealthCertificate', element: <List_393 /> },
  { path: '/modul/medical-record-health-certificate/tambah', module: 'MedicalRecordHealthCertificate', element: <Form_393 /> },
  { path: '/modul/medical-record-health-certificate/:id/edit', module: 'MedicalRecordHealthCertificate', element: <Form_393 /> },
  { path: '/modul/medical-record-hemodialysis-letter', module: 'MedicalRecordHemodialysisLetter', element: <List_394 /> },
  { path: '/modul/medical-record-hemodialysis-letter/tambah', module: 'MedicalRecordHemodialysisLetter', element: <Form_394 /> },
  { path: '/modul/medical-record-hemodialysis-letter/:id/edit', module: 'MedicalRecordHemodialysisLetter', element: <Form_394 /> },
  { path: '/modul/medical-record-hospitalization-certificate', module: 'MedicalRecordHospitalizationCertificate', element: <List_395 /> },
  { path: '/modul/medical-record-hospitalization-certificate/tambah', module: 'MedicalRecordHospitalizationCertificate', element: <Form_395 /> },
  { path: '/modul/medical-record-hospitalization-certificate/:id/edit', module: 'MedicalRecordHospitalizationCertificate', element: <Form_395 /> },
  { path: '/modul/medical-record-humpty-dumpty-fall-scale-assessment', module: 'MedicalRecordHumptyDumptyFallScaleAssessment', element: <List_396 /> },
  { path: '/modul/medical-record-humpty-dumpty-fall-scale-assessment/tambah', module: 'MedicalRecordHumptyDumptyFallScaleAssessment', element: <Form_396 /> },
  { path: '/modul/medical-record-humpty-dumpty-fall-scale-assessment/:id/edit', module: 'MedicalRecordHumptyDumptyFallScaleAssessment', element: <Form_396 /> },
  { path: '/modul/medical-record-icd10-cause-of-death-code', module: 'MedicalRecordIcd10CauseOfDeathCode', element: <List_397 /> },
  { path: '/modul/medical-record-icd10-cause-of-death-code/tambah', module: 'MedicalRecordIcd10CauseOfDeathCode', element: <Form_397 /> },
  { path: '/modul/medical-record-icd10-cause-of-death-code/:id/edit', module: 'MedicalRecordIcd10CauseOfDeathCode', element: <Form_397 /> },
  { path: '/modul/medical-record-icd10-code', module: 'MedicalRecordIcd10Code', element: <List_398 /> },
  { path: '/modul/medical-record-icd10-code/tambah', module: 'MedicalRecordIcd10Code', element: <Form_398 /> },
  { path: '/modul/medical-record-icd10-code/:id/edit', module: 'MedicalRecordIcd10Code', element: <Form_398 /> },
  { path: '/modul/medical-record-icd9-cm-code', module: 'MedicalRecordIcd9CmCode', element: <List_399 /> },
  { path: '/modul/medical-record-icd9-cm-code/tambah', module: 'MedicalRecordIcd9CmCode', element: <Form_399 /> },
  { path: '/modul/medical-record-icd9-cm-code/:id/edit', module: 'MedicalRecordIcd9CmCode', element: <Form_399 /> },
  { path: '/modul/medical-record-illness-progression-history', module: 'MedicalRecordIllnessProgressionHistory', element: <List_400 /> },
  { path: '/modul/medical-record-illness-progression-history/tambah', module: 'MedicalRecordIllnessProgressionHistory', element: <Form_400 /> },
  { path: '/modul/medical-record-illness-progression-history/:id/edit', module: 'MedicalRecordIllnessProgressionHistory', element: <Form_400 /> },
  { path: '/modul/medical-record-image-marker', module: 'MedicalRecordImageMarker', element: <List_401 /> },
  { path: '/modul/medical-record-image-marker/tambah', module: 'MedicalRecordImageMarker', element: <Form_401 /> },
  { path: '/modul/medical-record-image-marker/:id/edit', module: 'MedicalRecordImageMarker', element: <Form_401 /> },
  { path: '/modul/medical-record-image-marker-point', module: 'MedicalRecordImageMarkerPoint', element: <List_402 /> },
  { path: '/modul/medical-record-image-marker-point/tambah', module: 'MedicalRecordImageMarkerPoint', element: <Form_402 /> },
  { path: '/modul/medical-record-image-marker-point/:id/edit', module: 'MedicalRecordImageMarkerPoint', element: <Form_402 /> },
  { path: '/modul/medical-record-immunization-vaccination', module: 'MedicalRecordImmunizationVaccination', element: <List_403 /> },
  { path: '/modul/medical-record-immunization-vaccination/tambah', module: 'MedicalRecordImmunizationVaccination', element: <Form_403 /> },
  { path: '/modul/medical-record-immunization-vaccination/:id/edit', module: 'MedicalRecordImmunizationVaccination', element: <Form_403 /> },
  { path: '/modul/medical-record-implementation', module: 'MedicalRecordImplementation', element: <List_404 /> },
  { path: '/modul/medical-record-implementation/tambah', module: 'MedicalRecordImplementation', element: <Form_404 /> },
  { path: '/modul/medical-record-implementation/:id/edit', module: 'MedicalRecordImplementation', element: <Form_404 /> },
  { path: '/modul/medical-record-implementation-checklist-item', module: 'MedicalRecordImplementationChecklistItem', element: <List_405 /> },
  { path: '/modul/medical-record-implementation-checklist-item/tambah', module: 'MedicalRecordImplementationChecklistItem', element: <Form_405 /> },
  { path: '/modul/medical-record-implementation-checklist-item/:id/edit', module: 'MedicalRecordImplementationChecklistItem', element: <Form_405 /> },
  { path: '/modul/medical-record-implementation-note', module: 'MedicalRecordImplementationNote', element: <List_406 /> },
  { path: '/modul/medical-record-implementation-note/tambah', module: 'MedicalRecordImplementationNote', element: <Form_406 /> },
  { path: '/modul/medical-record-implementation-note/:id/edit', module: 'MedicalRecordImplementationNote', element: <Form_406 /> },
  { path: '/modul/medical-record-inhalant-allergen-examination', module: 'MedicalRecordInhalantAllergenExamination', element: <List_407 /> },
  { path: '/modul/medical-record-inhalant-allergen-examination/tambah', module: 'MedicalRecordInhalantAllergenExamination', element: <Form_407 /> },
  { path: '/modul/medical-record-inhalant-allergen-examination/:id/edit', module: 'MedicalRecordInhalantAllergenExamination', element: <Form_407 /> },
  { path: '/modul/medical-record-inpatient-care-plan', module: 'MedicalRecordInpatientCarePlan', element: <List_408 /> },
  { path: '/modul/medical-record-inpatient-care-plan/tambah', module: 'MedicalRecordInpatientCarePlan', element: <Form_408 /> },
  { path: '/modul/medical-record-inpatient-care-plan/:id/edit', module: 'MedicalRecordInpatientCarePlan', element: <Form_408 /> },
  { path: '/modul/medical-record-intervention-indicator-mapping', module: 'MedicalRecordInterventionIndicatorMapping', element: <List_409 /> },
  { path: '/modul/medical-record-intervention-indicator-mapping/tambah', module: 'MedicalRecordInterventionIndicatorMapping', element: <Form_409 /> },
  { path: '/modul/medical-record-intervention-indicator-mapping/:id/edit', module: 'MedicalRecordInterventionIndicatorMapping', element: <Form_409 /> },
  { path: '/modul/medical-record-intervention-protocol', module: 'MedicalRecordInterventionProtocol', element: <List_410 /> },
  { path: '/modul/medical-record-intervention-protocol/tambah', module: 'MedicalRecordInterventionProtocol', element: <Form_410 /> },
  { path: '/modul/medical-record-intervention-protocol/:id/edit', module: 'MedicalRecordInterventionProtocol', element: <Form_410 /> },
  { path: '/modul/medical-record-intervention-protocol-detail', module: 'MedicalRecordInterventionProtocolDetail', element: <List_411 /> },
  { path: '/modul/medical-record-intervention-protocol-detail/tambah', module: 'MedicalRecordInterventionProtocolDetail', element: <Form_411 /> },
  { path: '/modul/medical-record-intervention-protocol-detail/:id/edit', module: 'MedicalRecordInterventionProtocolDetail', element: <Form_411 /> },
  { path: '/modul/medical-record-intervention-recommendation', module: 'MedicalRecordInterventionRecommendation', element: <List_412 /> },
  { path: '/modul/medical-record-intervention-recommendation/tambah', module: 'MedicalRecordInterventionRecommendation', element: <Form_412 /> },
  { path: '/modul/medical-record-intervention-recommendation/:id/edit', module: 'MedicalRecordInterventionRecommendation', element: <Form_412 /> },
  { path: '/modul/medical-record-intradialytic-hd-monitoring', module: 'MedicalRecordIntradialyticHdMonitoring', element: <List_413 /> },
  { path: '/modul/medical-record-intradialytic-hd-monitoring/tambah', module: 'MedicalRecordIntradialyticHdMonitoring', element: <Form_413 /> },
  { path: '/modul/medical-record-intradialytic-hd-monitoring/:id/edit', module: 'MedicalRecordIntradialyticHdMonitoring', element: <Form_413 /> },
  { path: '/modul/medical-record-killip-class-assessment', module: 'MedicalRecordKillipClassAssessment', element: <List_414 /> },
  { path: '/modul/medical-record-killip-class-assessment/tambah', module: 'MedicalRecordKillipClassAssessment', element: <Form_414 /> },
  { path: '/modul/medical-record-killip-class-assessment/:id/edit', module: 'MedicalRecordKillipClassAssessment', element: <Form_414 /> },
  { path: '/modul/medical-record-lab-result-summary', module: 'MedicalRecordLabResultSummary', element: <List_415 /> },
  { path: '/modul/medical-record-lab-result-summary/tambah', module: 'MedicalRecordLabResultSummary', element: <Form_415 /> },
  { path: '/modul/medical-record-lab-result-summary/:id/edit', module: 'MedicalRecordLabResultSummary', element: <Form_415 /> },
  { path: '/modul/medical-record-lab-result-summary-item', module: 'MedicalRecordLabResultSummaryItem', element: <List_416 /> },
  { path: '/modul/medical-record-lab-result-summary-item/tambah', module: 'MedicalRecordLabResultSummaryItem', element: <Form_416 /> },
  { path: '/modul/medical-record-lab-result-summary-item/:id/edit', module: 'MedicalRecordLabResultSummaryItem', element: <Form_416 /> },
  { path: '/modul/medical-record-leg-joint-examination', module: 'MedicalRecordLegJointExamination', element: <List_417 /> },
  { path: '/modul/medical-record-leg-joint-examination/tambah', module: 'MedicalRecordLegJointExamination', element: <Form_417 /> },
  { path: '/modul/medical-record-leg-joint-examination/:id/edit', module: 'MedicalRecordLegJointExamination', element: <Form_417 /> },
  { path: '/modul/medical-record-lip-examination', module: 'MedicalRecordLipExamination', element: <List_418 /> },
  { path: '/modul/medical-record-lip-examination/tambah', module: 'MedicalRecordLipExamination', element: <Form_418 /> },
  { path: '/modul/medical-record-lip-examination/:id/edit', module: 'MedicalRecordLipExamination', element: <Form_418 /> },
  { path: '/modul/medical-record-lower-gi-tract-examination', module: 'MedicalRecordLowerGiTractExamination', element: <List_419 /> },
  { path: '/modul/medical-record-lower-gi-tract-examination/tambah', module: 'MedicalRecordLowerGiTractExamination', element: <Form_419 /> },
  { path: '/modul/medical-record-lower-gi-tract-examination/:id/edit', module: 'MedicalRecordLowerGiTractExamination', element: <Form_419 /> },
  { path: '/modul/medical-record-lower-leg-examination', module: 'MedicalRecordLowerLegExamination', element: <List_420 /> },
  { path: '/modul/medical-record-lower-leg-examination/tambah', module: 'MedicalRecordLowerLegExamination', element: <Form_420 /> },
  { path: '/modul/medical-record-lower-leg-examination/:id/edit', module: 'MedicalRecordLowerLegExamination', element: <Form_420 /> },
  { path: '/modul/medical-record-maternal-pregnancy-history', module: 'MedicalRecordMaternalPregnancyHistory', element: <List_421 /> },
  { path: '/modul/medical-record-maternal-pregnancy-history/tambah', module: 'MedicalRecordMaternalPregnancyHistory', element: <Form_421 /> },
  { path: '/modul/medical-record-maternal-pregnancy-history/:id/edit', module: 'MedicalRecordMaternalPregnancyHistory', element: <Form_421 /> },
  { path: '/modul/medical-record-mchat-assessment-examination', module: 'MedicalRecordMchatAssessmentExamination', element: <List_422 /> },
  { path: '/modul/medical-record-mchat-assessment-examination/tambah', module: 'MedicalRecordMchatAssessmentExamination', element: <Form_422 /> },
  { path: '/modul/medical-record-mchat-assessment-examination/:id/edit', module: 'MedicalRecordMchatAssessmentExamination', element: <Form_422 /> },
  { path: '/modul/medical-record-medical-checkup-result', module: 'MedicalRecordMedicalCheckupResult', element: <List_423 /> },
  { path: '/modul/medical-record-medical-checkup-result/tambah', module: 'MedicalRecordMedicalCheckupResult', element: <Form_423 /> },
  { path: '/modul/medical-record-medical-checkup-result/:id/edit', module: 'MedicalRecordMedicalCheckupResult', element: <Form_423 /> },
  { path: '/modul/medical-record-medication-administration-history', module: 'MedicalRecordMedicationAdministrationHistory', element: <List_424 /> },
  { path: '/modul/medical-record-medication-administration-history/tambah', module: 'MedicalRecordMedicationAdministrationHistory', element: <Form_424 /> },
  { path: '/modul/medical-record-medication-administration-history/:id/edit', module: 'MedicalRecordMedicationAdministrationHistory', element: <Form_424 /> },
  { path: '/modul/medical-record-mmpi-test', module: 'MedicalRecordMmpiTest', element: <List_425 /> },
  { path: '/modul/medical-record-mmpi-test/tambah', module: 'MedicalRecordMmpiTest', element: <Form_425 /> },
  { path: '/modul/medical-record-mmpi-test/:id/edit', module: 'MedicalRecordMmpiTest', element: <Form_425 /> },
  { path: '/modul/medical-record-modified-barthel-index-assessment', module: 'MedicalRecordModifiedBarthelIndexAssessment', element: <List_426 /> },
  { path: '/modul/medical-record-modified-barthel-index-assessment/tambah', module: 'MedicalRecordModifiedBarthelIndexAssessment', element: <Form_426 /> },
  { path: '/modul/medical-record-modified-barthel-index-assessment/:id/edit', module: 'MedicalRecordModifiedBarthelIndexAssessment', element: <Form_426 /> },
  { path: '/modul/medical-record-morse-fall-scale-assessment', module: 'MedicalRecordMorseFallScaleAssessment', element: <List_427 /> },
  { path: '/modul/medical-record-morse-fall-scale-assessment/tambah', module: 'MedicalRecordMorseFallScaleAssessment', element: <Form_427 /> },
  { path: '/modul/medical-record-morse-fall-scale-assessment/:id/edit', module: 'MedicalRecordMorseFallScaleAssessment', element: <Form_427 /> },
  { path: '/modul/medical-record-neck-examination', module: 'MedicalRecordNeckExamination', element: <List_428 /> },
  { path: '/modul/medical-record-neck-examination/tambah', module: 'MedicalRecordNeckExamination', element: <Form_428 /> },
  { path: '/modul/medical-record-neck-examination/:id/edit', module: 'MedicalRecordNeckExamination', element: <Form_428 /> },
  { path: '/modul/medical-record-nose-examination', module: 'MedicalRecordNoseExamination', element: <List_429 /> },
  { path: '/modul/medical-record-nose-examination/tambah', module: 'MedicalRecordNoseExamination', element: <Form_429 /> },
  { path: '/modul/medical-record-nose-examination/:id/edit', module: 'MedicalRecordNoseExamination', element: <Form_429 /> },
  { path: '/modul/medical-record-nursing-care-plan', module: 'MedicalRecordNursingCarePlan', element: <List_430 /> },
  { path: '/modul/medical-record-nursing-care-plan/tambah', module: 'MedicalRecordNursingCarePlan', element: <Form_430 /> },
  { path: '/modul/medical-record-nursing-care-plan/:id/edit', module: 'MedicalRecordNursingCarePlan', element: <Form_430 /> },
  { path: '/modul/medical-record-nursing-care-plan-implementation', module: 'MedicalRecordNursingCarePlanImplementation', element: <List_431 /> },
  { path: '/modul/medical-record-nursing-care-plan-implementation/tambah', module: 'MedicalRecordNursingCarePlanImplementation', element: <Form_431 /> },
  { path: '/modul/medical-record-nursing-care-plan-implementation/:id/edit', module: 'MedicalRecordNursingCarePlanImplementation', element: <Form_431 /> },
  { path: '/modul/medical-record-nursing-diagnosis', module: 'MedicalRecordNursingDiagnosis', element: <List_432 /> },
  { path: '/modul/medical-record-nursing-diagnosis/tambah', module: 'MedicalRecordNursingDiagnosis', element: <Form_432 /> },
  { path: '/modul/medical-record-nursing-diagnosis/:id/edit', module: 'MedicalRecordNursingDiagnosis', element: <Form_432 /> },
  { path: '/modul/medical-record-nursing-implementation', module: 'MedicalRecordNursingImplementation', element: <List_433 /> },
  { path: '/modul/medical-record-nursing-implementation/tambah', module: 'MedicalRecordNursingImplementation', element: <Form_433 /> },
  { path: '/modul/medical-record-nursing-implementation/:id/edit', module: 'MedicalRecordNursingImplementation', element: <Form_433 /> },
  { path: '/modul/medical-record-nursing-indicator', module: 'MedicalRecordNursingIndicator', element: <List_434 /> },
  { path: '/modul/medical-record-nursing-indicator/tambah', module: 'MedicalRecordNursingIndicator', element: <Form_434 /> },
  { path: '/modul/medical-record-nursing-indicator/:id/edit', module: 'MedicalRecordNursingIndicator', element: <Form_434 /> },
  { path: '/modul/medical-record-nursing-indicator-implementation', module: 'MedicalRecordNursingIndicatorImplementation', element: <List_435 /> },
  { path: '/modul/medical-record-nursing-indicator-implementation/tambah', module: 'MedicalRecordNursingIndicatorImplementation', element: <Form_435 /> },
  { path: '/modul/medical-record-nursing-indicator-implementation/:id/edit', module: 'MedicalRecordNursingIndicatorImplementation', element: <Form_435 /> },
  { path: '/modul/medical-record-nursing-indicator-type', module: 'MedicalRecordNursingIndicatorType', element: <List_436 /> },
  { path: '/modul/medical-record-nursing-indicator-type/tambah', module: 'MedicalRecordNursingIndicatorType', element: <Form_436 /> },
  { path: '/modul/medical-record-nursing-indicator-type/:id/edit', module: 'MedicalRecordNursingIndicatorType', element: <Form_436 /> },
  { path: '/modul/medical-record-nutrition-diet-pattern', module: 'MedicalRecordNutritionDietPattern', element: <List_437 /> },
  { path: '/modul/medical-record-nutrition-diet-pattern/tambah', module: 'MedicalRecordNutritionDietPattern', element: <Form_437 /> },
  { path: '/modul/medical-record-nutrition-diet-pattern/:id/edit', module: 'MedicalRecordNutritionDietPattern', element: <Form_437 /> },
  { path: '/modul/medical-record-obstetric-history', module: 'MedicalRecordObstetricHistory', element: <List_438 /> },
  { path: '/modul/medical-record-obstetric-history/tambah', module: 'MedicalRecordObstetricHistory', element: <Form_438 /> },
  { path: '/modul/medical-record-obstetric-history/:id/edit', module: 'MedicalRecordObstetricHistory', element: <Form_438 /> },
  { path: '/modul/medical-record-obstetrics', module: 'MedicalRecordObstetrics', element: <List_439 /> },
  { path: '/modul/medical-record-obstetrics/tambah', module: 'MedicalRecordObstetrics', element: <Form_439 /> },
  { path: '/modul/medical-record-obstetrics/:id/edit', module: 'MedicalRecordObstetrics', element: <Form_439 /> },
  { path: '/modul/medical-record-other-history', module: 'MedicalRecordOtherHistory', element: <List_440 /> },
  { path: '/modul/medical-record-other-history/tambah', module: 'MedicalRecordOtherHistory', element: <Form_440 /> },
  { path: '/modul/medical-record-other-history/:id/edit', module: 'MedicalRecordOtherHistory', element: <Form_440 /> },
  { path: '/modul/medical-record-pain-score-assessment', module: 'MedicalRecordPainScoreAssessment', element: <List_441 /> },
  { path: '/modul/medical-record-pain-score-assessment/tambah', module: 'MedicalRecordPainScoreAssessment', element: <Form_441 /> },
  { path: '/modul/medical-record-pain-score-assessment/:id/edit', module: 'MedicalRecordPainScoreAssessment', element: <Form_441 /> },
  { path: '/modul/medical-record-palate-examination', module: 'MedicalRecordPalateExamination', element: <List_442 /> },
  { path: '/modul/medical-record-palate-examination/tambah', module: 'MedicalRecordPalateExamination', element: <Form_442 /> },
  { path: '/modul/medical-record-palate-examination/:id/edit', module: 'MedicalRecordPalateExamination', element: <Form_442 /> },
  { path: '/modul/medical-record-parental-health-history-screening', module: 'MedicalRecordParentalHealthHistoryScreening', element: <List_443 /> },
  { path: '/modul/medical-record-parental-health-history-screening/tambah', module: 'MedicalRecordParentalHealthHistoryScreening', element: <Form_443 /> },
  { path: '/modul/medical-record-parental-health-history-screening/:id/edit', module: 'MedicalRecordParentalHealthHistoryScreening', element: <Form_443 /> },
  { path: '/modul/medical-record-patient-family-education', module: 'MedicalRecordPatientFamilyEducation', element: <List_444 /> },
  { path: '/modul/medical-record-patient-family-education/tambah', module: 'MedicalRecordPatientFamilyEducation', element: <Form_444 /> },
  { path: '/modul/medical-record-patient-family-education/:id/edit', module: 'MedicalRecordPatientFamilyEducation', element: <Form_444 /> },
  { path: '/modul/medical-record-patient-nutrition-problem', module: 'MedicalRecordPatientNutritionProblem', element: <List_445 /> },
  { path: '/modul/medical-record-patient-nutrition-problem/tambah', module: 'MedicalRecordPatientNutritionProblem', element: <Form_445 /> },
  { path: '/modul/medical-record-patient-nutrition-problem/:id/edit', module: 'MedicalRecordPatientNutritionProblem', element: <Form_445 /> },
  { path: '/modul/medical-record-patient-transfer-sheet', module: 'MedicalRecordPatientTransferSheet', element: <List_446 /> },
  { path: '/modul/medical-record-patient-transfer-sheet/tambah', module: 'MedicalRecordPatientTransferSheet', element: <Form_446 /> },
  { path: '/modul/medical-record-patient-transfer-sheet/:id/edit', module: 'MedicalRecordPatientTransferSheet', element: <Form_446 /> },
  { path: '/modul/medical-record-pediatric-status', module: 'MedicalRecordPediatricStatus', element: <List_447 /> },
  { path: '/modul/medical-record-pediatric-status/tambah', module: 'MedicalRecordPediatricStatus', element: <Form_447 /> },
  { path: '/modul/medical-record-pediatric-status/:id/edit', module: 'MedicalRecordPediatricStatus', element: <Form_447 /> },
  { path: '/modul/medical-record-pharmacy-diagnosis', module: 'MedicalRecordPharmacyDiagnosis', element: <List_448 /> },
  { path: '/modul/medical-record-pharmacy-diagnosis/tambah', module: 'MedicalRecordPharmacyDiagnosis', element: <Form_448 /> },
  { path: '/modul/medical-record-pharmacy-diagnosis/:id/edit', module: 'MedicalRecordPharmacyDiagnosis', element: <Form_448 /> },
  { path: '/modul/medical-record-pharynx-examination', module: 'MedicalRecordPharynxExamination', element: <List_449 /> },
  { path: '/modul/medical-record-pharynx-examination/tambah', module: 'MedicalRecordPharynxExamination', element: <Form_449 /> },
  { path: '/modul/medical-record-pharynx-examination/:id/edit', module: 'MedicalRecordPharynxExamination', element: <Form_449 /> },
  { path: '/modul/medical-record-physical-assessment', module: 'MedicalRecordPhysicalAssessment', element: <List_450 /> },
  { path: '/modul/medical-record-physical-assessment/tambah', module: 'MedicalRecordPhysicalAssessment', element: <Form_450 /> },
  { path: '/modul/medical-record-physical-assessment/:id/edit', module: 'MedicalRecordPhysicalAssessment', element: <Form_450 /> },
  { path: '/modul/medical-record-physical-examination', module: 'MedicalRecordPhysicalExamination', element: <List_451 /> },
  { path: '/modul/medical-record-physical-examination/tambah', module: 'MedicalRecordPhysicalExamination', element: <Form_451 /> },
  { path: '/modul/medical-record-physical-examination/:id/edit', module: 'MedicalRecordPhysicalExamination', element: <Form_451 /> },
  { path: '/modul/medical-record-plan-and-therapy', module: 'MedicalRecordPlanAndTherapy', element: <List_452 /> },
  { path: '/modul/medical-record-plan-and-therapy/tambah', module: 'MedicalRecordPlanAndTherapy', element: <Form_452 /> },
  { path: '/modul/medical-record-plan-and-therapy/:id/edit', module: 'MedicalRecordPlanAndTherapy', element: <Form_452 /> },
  { path: '/modul/medical-record-pre-anesthesia-sedation-assessment', module: 'MedicalRecordPreAnesthesiaSedationAssessment', element: <List_453 /> },
  { path: '/modul/medical-record-pre-anesthesia-sedation-assessment/tambah', module: 'MedicalRecordPreAnesthesiaSedationAssessment', element: <Form_453 /> },
  { path: '/modul/medical-record-pre-anesthesia-sedation-assessment/:id/edit', module: 'MedicalRecordPreAnesthesiaSedationAssessment', element: <Form_453 /> },
  { path: '/modul/medical-record-pressure-ulcer-risk-assessment', module: 'MedicalRecordPressureUlcerRiskAssessment', element: <List_454 /> },
  { path: '/modul/medical-record-pressure-ulcer-risk-assessment/tambah', module: 'MedicalRecordPressureUlcerRiskAssessment', element: <Form_454 /> },
  { path: '/modul/medical-record-pressure-ulcer-risk-assessment/:id/edit', module: 'MedicalRecordPressureUlcerRiskAssessment', element: <Form_454 /> },
  { path: '/modul/medical-record-procedure-consent-information', module: 'MedicalRecordProcedureConsentInformation', element: <List_455 /> },
  { path: '/modul/medical-record-procedure-consent-information/tambah', module: 'MedicalRecordProcedureConsentInformation', element: <Form_455 /> },
  { path: '/modul/medical-record-procedure-consent-information/:id/edit', module: 'MedicalRecordProcedureConsentInformation', element: <Form_455 /> },
  { path: '/modul/medical-record-procedure-consent-information-giver', module: 'MedicalRecordProcedureConsentInformationGiver', element: <List_456 /> },
  { path: '/modul/medical-record-procedure-consent-information-giver/tambah', module: 'MedicalRecordProcedureConsentInformationGiver', element: <Form_456 /> },
  { path: '/modul/medical-record-procedure-consent-information-giver/:id/edit', module: 'MedicalRecordProcedureConsentInformationGiver', element: <Form_456 /> },
  { path: '/modul/medical-record-procedure-consent-information-item', module: 'MedicalRecordProcedureConsentInformationItem', element: <List_457 /> },
  { path: '/modul/medical-record-procedure-consent-information-item/tambah', module: 'MedicalRecordProcedureConsentInformationItem', element: <Form_457 /> },
  { path: '/modul/medical-record-procedure-consent-information-item/:id/edit', module: 'MedicalRecordProcedureConsentInformationItem', element: <Form_457 /> },
  { path: '/modul/medical-record-procedure-consent-information-receiver', module: 'MedicalRecordProcedureConsentInformationReceiver', element: <List_458 /> },
  { path: '/modul/medical-record-procedure-consent-information-receiver/tambah', module: 'MedicalRecordProcedureConsentInformationReceiver', element: <Form_458 /> },
  { path: '/modul/medical-record-procedure-consent-information-receiver/:id/edit', module: 'MedicalRecordProcedureConsentInformationReceiver', element: <Form_458 /> },
  { path: '/modul/medical-record-procedure-consent-patient-acknowledgement', module: 'MedicalRecordProcedureConsentPatientAcknowledgement', element: <List_459 /> },
  { path: '/modul/medical-record-procedure-consent-patient-acknowledgement/tambah', module: 'MedicalRecordProcedureConsentPatientAcknowledgement', element: <Form_459 /> },
  { path: '/modul/medical-record-procedure-consent-patient-acknowledgement/:id/edit', module: 'MedicalRecordProcedureConsentPatientAcknowledgement', element: <Form_459 /> },
  { path: '/modul/medical-record-procedure-surgery', module: 'MedicalRecordProcedureSurgery', element: <List_460 /> },
  { path: '/modul/medical-record-procedure-surgery/tambah', module: 'MedicalRecordProcedureSurgery', element: <Form_460 /> },
  { path: '/modul/medical-record-procedure-surgery/:id/edit', module: 'MedicalRecordProcedureSurgery', element: <Form_460 /> },
  { path: '/modul/medical-record-radiology-result-summary', module: 'MedicalRecordRadiologyResultSummary', element: <List_461 /> },
  { path: '/modul/medical-record-radiology-result-summary/tambah', module: 'MedicalRecordRadiologyResultSummary', element: <Form_461 /> },
  { path: '/modul/medical-record-radiology-result-summary/:id/edit', module: 'MedicalRecordRadiologyResultSummary', element: <Form_461 /> },
  { path: '/modul/medical-record-radiology-result-summary-item', module: 'MedicalRecordRadiologyResultSummaryItem', element: <List_462 /> },
  { path: '/modul/medical-record-radiology-result-summary-item/tambah', module: 'MedicalRecordRadiologyResultSummaryItem', element: <Form_462 /> },
  { path: '/modul/medical-record-radiology-result-summary-item/:id/edit', module: 'MedicalRecordRadiologyResultSummaryItem', element: <Form_462 /> },
  { path: '/modul/medical-record-raven-test-examination', module: 'MedicalRecordRavenTestExamination', element: <List_463 /> },
  { path: '/modul/medical-record-raven-test-examination/tambah', module: 'MedicalRecordRavenTestExamination', element: <Form_463 /> },
  { path: '/modul/medical-record-raven-test-examination/:id/edit', module: 'MedicalRecordRavenTestExamination', element: <Form_463 /> },
  { path: '/modul/medical-record-record-file-loan', module: 'MedicalRecordRecordFileLoan', element: <List_464 /> },
  { path: '/modul/medical-record-record-file-loan/tambah', module: 'MedicalRecordRecordFileLoan', element: <Form_464 /> },
  { path: '/modul/medical-record-record-file-loan/:id/edit', module: 'MedicalRecordRecordFileLoan', element: <Form_464 /> },
  { path: '/modul/medical-record-rehabilitation-procedure-examination', module: 'MedicalRecordRehabilitationProcedureExamination', element: <List_465 /> },
  { path: '/modul/medical-record-rehabilitation-procedure-examination/tambah', module: 'MedicalRecordRehabilitationProcedureExamination', element: <Form_465 /> },
  { path: '/modul/medical-record-rehabilitation-procedure-examination/:id/edit', module: 'MedicalRecordRehabilitationProcedureExamination', element: <Form_465 /> },
  { path: '/modul/medical-record-rehabilitation-procedure-examination-item', module: 'MedicalRecordRehabilitationProcedureExaminationItem', element: <List_466 /> },
  { path: '/modul/medical-record-rehabilitation-procedure-examination-item/tambah', module: 'MedicalRecordRehabilitationProcedureExaminationItem', element: <Form_466 /> },
  { path: '/modul/medical-record-rehabilitation-procedure-examination-item/:id/edit', module: 'MedicalRecordRehabilitationProcedureExaminationItem', element: <Form_466 /> },
  { path: '/modul/medical-record-risk-factor', module: 'MedicalRecordRiskFactor', element: <List_467 /> },
  { path: '/modul/medical-record-risk-factor/tambah', module: 'MedicalRecordRiskFactor', element: <Form_467 /> },
  { path: '/modul/medical-record-risk-factor/:id/edit', module: 'MedicalRecordRiskFactor', element: <Form_467 /> },
  { path: '/modul/medical-record-sick-leave-certificate', module: 'MedicalRecordSickLeaveCertificate', element: <List_468 /> },
  { path: '/modul/medical-record-sick-leave-certificate/tambah', module: 'MedicalRecordSickLeaveCertificate', element: <Form_468 /> },
  { path: '/modul/medical-record-sick-leave-certificate/:id/edit', module: 'MedicalRecordSickLeaveCertificate', element: <Form_468 /> },
  { path: '/modul/medical-record-skin-prick-test-examination', module: 'MedicalRecordSkinPrickTestExamination', element: <List_469 /> },
  { path: '/modul/medical-record-skin-prick-test-examination/tambah', module: 'MedicalRecordSkinPrickTestExamination', element: <Form_469 /> },
  { path: '/modul/medical-record-skin-prick-test-examination/:id/edit', module: 'MedicalRecordSkinPrickTestExamination', element: <Form_469 /> },
  { path: '/modul/medical-record-social-condition', module: 'MedicalRecordSocialCondition', element: <List_470 /> },
  { path: '/modul/medical-record-social-condition/tambah', module: 'MedicalRecordSocialCondition', element: <Form_470 /> },
  { path: '/modul/medical-record-social-condition/:id/edit', module: 'MedicalRecordSocialCondition', element: <Form_470 /> },
  { path: '/modul/medical-record-surgery', module: 'MedicalRecordSurgery', element: <List_471 /> },
  { path: '/modul/medical-record-surgery/tambah', module: 'MedicalRecordSurgery', element: <Form_471 /> },
  { path: '/modul/medical-record-surgery/:id/edit', module: 'MedicalRecordSurgery', element: <Form_471 /> },
  { path: '/modul/medical-record-surgery-performer', module: 'MedicalRecordSurgeryPerformer', element: <List_472 /> },
  { path: '/modul/medical-record-surgery-performer/tambah', module: 'MedicalRecordSurgeryPerformer', element: <Form_472 /> },
  { path: '/modul/medical-record-surgery-performer/:id/edit', module: 'MedicalRecordSurgeryPerformer', element: <Form_472 /> },
  { path: '/modul/medical-record-surgical-procedure-history', module: 'MedicalRecordSurgicalProcedureHistory', element: <List_473 /> },
  { path: '/modul/medical-record-surgical-procedure-history/tambah', module: 'MedicalRecordSurgicalProcedureHistory', element: <Form_473 /> },
  { path: '/modul/medical-record-surgical-procedure-history/:id/edit', module: 'MedicalRecordSurgicalProcedureHistory', element: <Form_473 /> },
  { path: '/modul/medical-record-tb-disease-history', module: 'MedicalRecordTbDiseaseHistory', element: <List_474 /> },
  { path: '/modul/medical-record-tb-disease-history/tambah', module: 'MedicalRecordTbDiseaseHistory', element: <Form_474 /> },
  { path: '/modul/medical-record-tb-disease-history/:id/edit', module: 'MedicalRecordTbDiseaseHistory', element: <Form_474 /> },
  { path: '/modul/medical-record-thigh-examination', module: 'MedicalRecordThighExamination', element: <List_475 /> },
  { path: '/modul/medical-record-thigh-examination/tambah', module: 'MedicalRecordThighExamination', element: <Form_475 /> },
  { path: '/modul/medical-record-thigh-examination/:id/edit', module: 'MedicalRecordThighExamination', element: <Form_475 /> },
  { path: '/modul/medical-record-throat-examination', module: 'MedicalRecordThroatExamination', element: <List_476 /> },
  { path: '/modul/medical-record-throat-examination/tambah', module: 'MedicalRecordThroatExamination', element: <Form_476 /> },
  { path: '/modul/medical-record-throat-examination/:id/edit', module: 'MedicalRecordThroatExamination', element: <Form_476 /> },
  { path: '/modul/medical-record-toe-examination', module: 'MedicalRecordToeExamination', element: <List_477 /> },
  { path: '/modul/medical-record-toe-examination/tambah', module: 'MedicalRecordToeExamination', element: <Form_477 /> },
  { path: '/modul/medical-record-toe-examination/:id/edit', module: 'MedicalRecordToeExamination', element: <Form_477 /> },
  { path: '/modul/medical-record-toenail-examination', module: 'MedicalRecordToenailExamination', element: <List_478 /> },
  { path: '/modul/medical-record-toenail-examination/tambah', module: 'MedicalRecordToenailExamination', element: <Form_478 /> },
  { path: '/modul/medical-record-toenail-examination/:id/edit', module: 'MedicalRecordToenailExamination', element: <Form_478 /> },
  { path: '/modul/medical-record-tongue-examination', module: 'MedicalRecordTongueExamination', element: <List_479 /> },
  { path: '/modul/medical-record-tongue-examination/tambah', module: 'MedicalRecordTongueExamination', element: <Form_479 /> },
  { path: '/modul/medical-record-tongue-examination/:id/edit', module: 'MedicalRecordTongueExamination', element: <Form_479 /> },
  { path: '/modul/medical-record-tonsil-examination', module: 'MedicalRecordTonsilExamination', element: <List_480 /> },
  { path: '/modul/medical-record-tonsil-examination/tambah', module: 'MedicalRecordTonsilExamination', element: <Form_480 /> },
  { path: '/modul/medical-record-tonsil-examination/:id/edit', module: 'MedicalRecordTonsilExamination', element: <Form_480 /> },
  { path: '/modul/medical-record-transcranial-doppler-examination', module: 'MedicalRecordTranscranialDopplerExamination', element: <List_481 /> },
  { path: '/modul/medical-record-transcranial-doppler-examination/tambah', module: 'MedicalRecordTranscranialDopplerExamination', element: <Form_481 /> },
  { path: '/modul/medical-record-transcranial-doppler-examination/:id/edit', module: 'MedicalRecordTranscranialDopplerExamination', element: <Form_481 /> },
  { path: '/modul/medical-record-transcranial-doppler-window', module: 'MedicalRecordTranscranialDopplerWindow', element: <List_482 /> },
  { path: '/modul/medical-record-transcranial-doppler-window/tambah', module: 'MedicalRecordTranscranialDopplerWindow', element: <Form_482 /> },
  { path: '/modul/medical-record-transcranial-doppler-window/:id/edit', module: 'MedicalRecordTranscranialDopplerWindow', element: <Form_482 /> },
  { path: '/modul/medical-record-transfer-medication-reconciliation', module: 'MedicalRecordTransferMedicationReconciliation', element: <List_483 /> },
  { path: '/modul/medical-record-transfer-medication-reconciliation/tambah', module: 'MedicalRecordTransferMedicationReconciliation', element: <Form_483 /> },
  { path: '/modul/medical-record-transfer-medication-reconciliation/:id/edit', module: 'MedicalRecordTransferMedicationReconciliation', element: <Form_483 /> },
  { path: '/modul/medical-record-transfer-medication-reconciliation-item', module: 'MedicalRecordTransferMedicationReconciliationItem', element: <List_484 /> },
  { path: '/modul/medical-record-transfer-medication-reconciliation-item/tambah', module: 'MedicalRecordTransferMedicationReconciliationItem', element: <Form_484 /> },
  { path: '/modul/medical-record-transfer-medication-reconciliation-item/:id/edit', module: 'MedicalRecordTransferMedicationReconciliationItem', element: <Form_484 /> },
  { path: '/modul/medical-record-treatment-history', module: 'MedicalRecordTreatmentHistory', element: <List_485 /> },
  { path: '/modul/medical-record-treatment-history/tambah', module: 'MedicalRecordTreatmentHistory', element: <Form_485 /> },
  { path: '/modul/medical-record-treatment-history/:id/edit', module: 'MedicalRecordTreatmentHistory', element: <Form_485 /> },
  { path: '/modul/medical-record-triage', module: 'MedicalRecordTriage', element: <List_486 /> },
  { path: '/modul/medical-record-triage/tambah', module: 'MedicalRecordTriage', element: <Form_486 /> },
  { path: '/modul/medical-record-triage/:id/edit', module: 'MedicalRecordTriage', element: <Form_486 /> },
  { path: '/modul/medical-record-tumor-assessment', module: 'MedicalRecordTumorAssessment', element: <List_487 /> },
  { path: '/modul/medical-record-tumor-assessment/tambah', module: 'MedicalRecordTumorAssessment', element: <Form_487 /> },
  { path: '/modul/medical-record-tumor-assessment/:id/edit', module: 'MedicalRecordTumorAssessment', element: <Form_487 /> },
  { path: '/modul/medical-record-ultrasound-guided-procedure', module: 'MedicalRecordUltrasoundGuidedProcedure', element: <List_488 /> },
  { path: '/modul/medical-record-ultrasound-guided-procedure/tambah', module: 'MedicalRecordUltrasoundGuidedProcedure', element: <Form_488 /> },
  { path: '/modul/medical-record-ultrasound-guided-procedure/:id/edit', module: 'MedicalRecordUltrasoundGuidedProcedure', element: <Form_488 /> },
  { path: '/modul/medical-record-upper-arm-examination', module: 'MedicalRecordUpperArmExamination', element: <List_489 /> },
  { path: '/modul/medical-record-upper-arm-examination/tambah', module: 'MedicalRecordUpperArmExamination', element: <Form_489 /> },
  { path: '/modul/medical-record-upper-arm-examination/:id/edit', module: 'MedicalRecordUpperArmExamination', element: <Form_489 /> },
  { path: '/modul/medical-record-upper-gi-tract-examination', module: 'MedicalRecordUpperGiTractExamination', element: <List_490 /> },
  { path: '/modul/medical-record-upper-gi-tract-examination/tambah', module: 'MedicalRecordUpperGiTractExamination', element: <Form_490 /> },
  { path: '/modul/medical-record-upper-gi-tract-examination/:id/edit', module: 'MedicalRecordUpperGiTractExamination', element: <Form_490 /> },
  { path: '/modul/medical-record-vital-sign', module: 'MedicalRecordVitalSign', element: <List_491 /> },
  { path: '/modul/medical-record-vital-sign/tambah', module: 'MedicalRecordVitalSign', element: <Form_491 /> },
  { path: '/modul/medical-record-vital-sign/:id/edit', module: 'MedicalRecordVitalSign', element: <Form_491 /> },
  { path: '/modul/pasien-patient-portal-account', module: 'PasienPatientPortalAccount', element: <List_492 /> },
  { path: '/modul/pasien-patient-portal-account/tambah', module: 'PasienPatientPortalAccount', element: <Form_492 /> },
  { path: '/modul/pasien-patient-portal-account/:id/edit', module: 'PasienPatientPortalAccount', element: <Form_492 /> },
  { path: '/modul/pegawai-employee-contact', module: 'PegawaiEmployeeContact', element: <List_493 /> },
  { path: '/modul/pegawai-employee-contact/tambah', module: 'PegawaiEmployeeContact', element: <Form_493 /> },
  { path: '/modul/pegawai-employee-contact/:id/edit', module: 'PegawaiEmployeeContact', element: <Form_493 /> },
  { path: '/modul/pegawai-employee-identity-card', module: 'PegawaiEmployeeIdentityCard', element: <List_494 /> },
  { path: '/modul/pegawai-employee-identity-card/tambah', module: 'PegawaiEmployeeIdentityCard', element: <Form_494 /> },
  { path: '/modul/pegawai-employee-identity-card/:id/edit', module: 'PegawaiEmployeeIdentityCard', element: <Form_494 /> },
  { path: '/modul/pegawai-jadwal-shift', module: 'PegawaiJadwalShift', element: <List_495 /> },
  { path: '/modul/pegawai-jadwal-shift/tambah', module: 'PegawaiJadwalShift', element: <Form_495 /> },
  { path: '/modul/pegawai-jadwal-shift/:id/edit', module: 'PegawaiJadwalShift', element: <Form_495 /> },
  { path: '/modul/pegawai-practice-license', module: 'PegawaiPracticeLicense', element: <List_496 /> },
  { path: '/modul/pegawai-practice-license/tambah', module: 'PegawaiPracticeLicense', element: <Form_496 /> },
  { path: '/modul/pegawai-practice-license/:id/edit', module: 'PegawaiPracticeLicense', element: <Form_496 /> },
  { path: '/modul/pegawai-remunerasi-jasa-medis', module: 'PegawaiRemunerasiJasaMedis', element: <List_497 /> },
  { path: '/modul/pegawai-remunerasi-jasa-medis/tambah', module: 'PegawaiRemunerasiJasaMedis', element: <Form_497 /> },
  { path: '/modul/pegawai-remunerasi-jasa-medis/:id/edit', module: 'PegawaiRemunerasiJasaMedis', element: <Form_497 /> },
  { path: '/modul/pembatalan-document-cancellation', module: 'PembatalanDocumentCancellation', element: <List_498 /> },
  { path: '/modul/pembatalan-document-cancellation/tambah', module: 'PembatalanDocumentCancellation', element: <Form_498 /> },
  { path: '/modul/pembatalan-document-cancellation/:id/edit', module: 'PembatalanDocumentCancellation', element: <Form_498 /> },
  { path: '/modul/pembatalan-final-result', module: 'PembatalanFinalResult', element: <List_499 /> },
  { path: '/modul/pembatalan-final-result/tambah', module: 'PembatalanFinalResult', element: <Form_499 /> },
  { path: '/modul/pembatalan-final-result/:id/edit', module: 'PembatalanFinalResult', element: <Form_499 /> },
  { path: '/modul/pembatalan-medical-record-cancellation', module: 'PembatalanMedicalRecordCancellation', element: <List_500 /> },
  { path: '/modul/pembatalan-medical-record-cancellation/tambah', module: 'PembatalanMedicalRecordCancellation', element: <Form_500 /> },
  { path: '/modul/pembatalan-medical-record-cancellation/:id/edit', module: 'PembatalanMedicalRecordCancellation', element: <Form_500 /> },
  { path: '/modul/pembatalan-return-cancellation', module: 'PembatalanReturnCancellation', element: <List_501 /> },
  { path: '/modul/pembatalan-return-cancellation/tambah', module: 'PembatalanReturnCancellation', element: <Form_501 /> },
  { path: '/modul/pembatalan-return-cancellation/:id/edit', module: 'PembatalanReturnCancellation', element: <Form_501 /> },
  { path: '/modul/pembatalan-visit-cancellation', module: 'PembatalanVisitCancellation', element: <List_502 /> },
  { path: '/modul/pembatalan-visit-cancellation/tambah', module: 'PembatalanVisitCancellation', element: <Form_502 /> },
  { path: '/modul/pembatalan-visit-cancellation/:id/edit', module: 'PembatalanVisitCancellation', element: <Form_502 /> },
  { path: '/modul/pembayaran-cashier', module: 'PembayaranCashier', element: <List_503 /> },
  { path: '/modul/pembayaran-cashier/tambah', module: 'PembayaranCashier', element: <Form_503 /> },
  { path: '/modul/pembayaran-cashier/:id/edit', module: 'PembayaranCashier', element: <Form_503 /> },
  { path: '/modul/pembayaran-cashier-transaction', module: 'PembayaranCashierTransaction', element: <List_504 /> },
  { path: '/modul/pembayaran-cashier-transaction/tambah', module: 'PembayaranCashierTransaction', element: <Form_504 /> },
  { path: '/modul/pembayaran-cashier-transaction/:id/edit', module: 'PembayaranCashierTransaction', element: <Form_504 /> },
  { path: '/modul/pembayaran-claim-invoice', module: 'PembayaranClaimInvoice', element: <List_505 /> },
  { path: '/modul/pembayaran-claim-invoice/tambah', module: 'PembayaranClaimInvoice', element: <Form_505 /> },
  { path: '/modul/pembayaran-claim-invoice/:id/edit', module: 'PembayaranClaimInvoice', element: <Form_505 /> },
  { path: '/modul/pembayaran-corporate-receivable', module: 'PembayaranCorporateReceivable', element: <List_506 /> },
  { path: '/modul/pembayaran-corporate-receivable/tambah', module: 'PembayaranCorporateReceivable', element: <Form_506 /> },
  { path: '/modul/pembayaran-corporate-receivable/:id/edit', module: 'PembayaranCorporateReceivable', element: <Form_506 /> },
  { path: '/modul/pembayaran-corporate-receivable-settlement', module: 'PembayaranCorporateReceivableSettlement', element: <List_507 /> },
  { path: '/modul/pembayaran-corporate-receivable-settlement/tambah', module: 'PembayaranCorporateReceivableSettlement', element: <Form_507 /> },
  { path: '/modul/pembayaran-corporate-receivable-settlement/:id/edit', module: 'PembayaranCorporateReceivableSettlement', element: <Form_507 /> },
  { path: '/modul/pembayaran-deposit', module: 'PembayaranDeposit', element: <List_508 /> },
  { path: '/modul/pembayaran-deposit/tambah', module: 'PembayaranDeposit', element: <Form_508 /> },
  { path: '/modul/pembayaran-deposit/:id/edit', module: 'PembayaranDeposit', element: <Form_508 /> },
  { path: '/modul/pembayaran-deposit-refund', module: 'PembayaranDepositRefund', element: <List_509 /> },
  { path: '/modul/pembayaran-deposit-refund/tambah', module: 'PembayaranDepositRefund', element: <Form_509 /> },
  { path: '/modul/pembayaran-deposit-refund/:id/edit', module: 'PembayaranDepositRefund', element: <Form_509 /> },
  { path: '/modul/pembayaran-discount', module: 'PembayaranDiscount', element: <List_510 /> },
  { path: '/modul/pembayaran-discount/tambah', module: 'PembayaranDiscount', element: <Form_510 /> },
  { path: '/modul/pembayaran-discount/:id/edit', module: 'PembayaranDiscount', element: <Form_510 /> },
  { path: '/modul/pembayaran-doctor-discount', module: 'PembayaranDoctorDiscount', element: <List_511 /> },
  { path: '/modul/pembayaran-doctor-discount/tambah', module: 'PembayaranDoctorDiscount', element: <Form_511 /> },
  { path: '/modul/pembayaran-doctor-discount/:id/edit', module: 'PembayaranDoctorDiscount', element: <Form_511 /> },
  { path: '/modul/pembayaran-edc', module: 'PembayaranEdc', element: <List_512 /> },
  { path: '/modul/pembayaran-edc/tambah', module: 'PembayaranEdc', element: <Form_512 /> },
  { path: '/modul/pembayaran-edc/:id/edit', module: 'PembayaranEdc', element: <Form_512 /> },
  { path: '/modul/pembayaran-invoice', module: 'PembayaranInvoice', element: <List_513 /> },
  { path: '/modul/pembayaran-invoice/tambah', module: 'PembayaranInvoice', element: <Form_513 /> },
  { path: '/modul/pembayaran-invoice/:id/edit', module: 'PembayaranInvoice', element: <Form_513 /> },
  { path: '/modul/pembayaran-invoice-cancellation', module: 'PembayaranInvoiceCancellation', element: <List_514 /> },
  { path: '/modul/pembayaran-invoice-cancellation/tambah', module: 'PembayaranInvoiceCancellation', element: <Form_514 /> },
  { path: '/modul/pembayaran-invoice-cancellation/:id/edit', module: 'PembayaranInvoiceCancellation', element: <Form_514 /> },
  { path: '/modul/pembayaran-invoice-guarantor', module: 'PembayaranInvoiceGuarantor', element: <List_515 /> },
  { path: '/modul/pembayaran-invoice-guarantor/tambah', module: 'PembayaranInvoiceGuarantor', element: <Form_515 /> },
  { path: '/modul/pembayaran-invoice-guarantor/:id/edit', module: 'PembayaranInvoiceGuarantor', element: <Form_515 /> },
  { path: '/modul/pembayaran-invoice-item', module: 'PembayaranInvoiceItem', element: <List_516 /> },
  { path: '/modul/pembayaran-invoice-item/tambah', module: 'PembayaranInvoiceItem', element: <Form_516 /> },
  { path: '/modul/pembayaran-invoice-item/:id/edit', module: 'PembayaranInvoiceItem', element: <Form_516 /> },
  { path: '/modul/pembayaran-invoice-merge', module: 'PembayaranInvoiceMerge', element: <List_517 /> },
  { path: '/modul/pembayaran-invoice-merge/tambah', module: 'PembayaranInvoiceMerge', element: <Form_517 /> },
  { path: '/modul/pembayaran-invoice-merge/:id/edit', module: 'PembayaranInvoiceMerge', element: <Form_517 /> },
  { path: '/modul/pembayaran-invoice-subsidy', module: 'PembayaranInvoiceSubsidy', element: <List_518 /> },
  { path: '/modul/pembayaran-invoice-subsidy/tambah', module: 'PembayaranInvoiceSubsidy', element: <Form_518 /> },
  { path: '/modul/pembayaran-invoice-subsidy/:id/edit', module: 'PembayaranInvoiceSubsidy', element: <Form_518 /> },
  { path: '/modul/pembayaran-package-invoice-item', module: 'PembayaranPackageInvoiceItem', element: <List_519 /> },
  { path: '/modul/pembayaran-package-invoice-item/tambah', module: 'PembayaranPackageInvoiceItem', element: <Form_519 /> },
  { path: '/modul/pembayaran-package-invoice-item/:id/edit', module: 'PembayaranPackageInvoiceItem', element: <Form_519 /> },
  { path: '/modul/pembayaran-patient-receivable', module: 'PembayaranPatientReceivable', element: <List_520 /> },
  { path: '/modul/pembayaran-patient-receivable/tambah', module: 'PembayaranPatientReceivable', element: <Form_520 /> },
  { path: '/modul/pembayaran-patient-receivable/:id/edit', module: 'PembayaranPatientReceivable', element: <Form_520 /> },
  { path: '/modul/pembayaran-patient-receivable-settlement', module: 'PembayaranPatientReceivableSettlement', element: <List_521 /> },
  { path: '/modul/pembayaran-patient-receivable-settlement/tambah', module: 'PembayaranPatientReceivableSettlement', element: <Form_521 /> },
  { path: '/modul/pembayaran-patient-receivable-settlement/:id/edit', module: 'PembayaranPatientReceivableSettlement', element: <Form_521 /> },
  { path: '/modul/pembayaran-payment', module: 'PembayaranPayment', element: <List_522 /> },
  { path: '/modul/pembayaran-payment/tambah', module: 'PembayaranPayment', element: <Form_522 /> },
  { path: '/modul/pembayaran-payment/:id/edit', module: 'PembayaranPayment', element: <Form_522 /> },
  { path: '/modul/pembayaran-payment-provider', module: 'PembayaranPaymentProvider', element: <List_523 /> },
  { path: '/modul/pembayaran-payment-provider/tambah', module: 'PembayaranPaymentProvider', element: <Form_523 /> },
  { path: '/modul/pembayaran-payment-provider/:id/edit', module: 'PembayaranPaymentProvider', element: <Form_523 /> },
  { path: '/modul/pembayaran-provider-service', module: 'PembayaranProviderService', element: <List_524 /> },
  { path: '/modul/pembayaran-provider-service/tambah', module: 'PembayaranProviderService', element: <Form_524 /> },
  { path: '/modul/pembayaran-provider-service/:id/edit', module: 'PembayaranProviderService', element: <Form_524 /> },
  { path: '/modul/pembayaran-registration-invoice', module: 'PembayaranRegistrationInvoice', element: <List_525 /> },
  { path: '/modul/pembayaran-registration-invoice/tambah', module: 'PembayaranRegistrationInvoice', element: <Form_525 /> },
  { path: '/modul/pembayaran-registration-invoice/:id/edit', module: 'PembayaranRegistrationInvoice', element: <Form_525 /> },
  { path: '/modul/pembayaran-transfer', module: 'PembayaranTransfer', element: <List_526 /> },
  { path: '/modul/pembayaran-transfer/tambah', module: 'PembayaranTransfer', element: <Form_526 /> },
  { path: '/modul/pembayaran-transfer/:id/edit', module: 'PembayaranTransfer', element: <Form_526 /> },
  { path: '/modul/pendaftaran-accident-record', module: 'PendaftaranAccidentRecord', element: <List_527 /> },
  { path: '/modul/pendaftaran-accident-record/tambah', module: 'PendaftaranAccidentRecord', element: <Form_527 /> },
  { path: '/modul/pendaftaran-accident-record/:id/edit', module: 'PendaftaranAccidentRecord', element: <Form_527 /> },
  { path: '/modul/pendaftaran-applicant', module: 'PendaftaranApplicant', element: <List_528 /> },
  { path: '/modul/pendaftaran-applicant/tambah', module: 'PendaftaranApplicant', element: <Form_528 /> },
  { path: '/modul/pendaftaran-applicant/:id/edit', module: 'PendaftaranApplicant', element: <Form_528 /> },
  { path: '/modul/pendaftaran-bed-queue', module: 'PendaftaranBedQueue', element: <List_529 /> },
  { path: '/modul/pendaftaran-bed-queue/tambah', module: 'PendaftaranBedQueue', element: <Form_529 /> },
  { path: '/modul/pendaftaran-bed-queue/:id/edit', module: 'PendaftaranBedQueue', element: <Form_529 /> },
  { path: '/modul/pendaftaran-co-management', module: 'PendaftaranCoManagement', element: <List_530 /> },
  { path: '/modul/pendaftaran-co-management/tambah', module: 'PendaftaranCoManagement', element: <Form_530 /> },
  { path: '/modul/pendaftaran-co-management/:id/edit', module: 'PendaftaranCoManagement', element: <Form_530 /> },
  { path: '/modul/pendaftaran-consultation', module: 'PendaftaranConsultation', element: <List_531 /> },
  { path: '/modul/pendaftaran-consultation/tambah', module: 'PendaftaranConsultation', element: <Form_531 /> },
  { path: '/modul/pendaftaran-consultation/:id/edit', module: 'PendaftaranConsultation', element: <Form_531 /> },
  { path: '/modul/pendaftaran-consultation-answer', module: 'PendaftaranConsultationAnswer', element: <List_532 /> },
  { path: '/modul/pendaftaran-consultation-answer/tambah', module: 'PendaftaranConsultationAnswer', element: <Form_532 /> },
  { path: '/modul/pendaftaran-consultation-answer/:id/edit', module: 'PendaftaranConsultationAnswer', element: <Form_532 /> },
  { path: '/modul/pendaftaran-function', module: 'PendaftaranFunction', element: <List_533 /> },
  { path: '/modul/pendaftaran-function/tambah', module: 'PendaftaranFunction', element: <Form_533 /> },
  { path: '/modul/pendaftaran-function/:id/edit', module: 'PendaftaranFunction', element: <Form_533 /> },
  { path: '/modul/pendaftaran-guarantor', module: 'PendaftaranGuarantor', element: <List_534 /> },
  { path: '/modul/pendaftaran-guarantor/tambah', module: 'PendaftaranGuarantor', element: <Form_534 /> },
  { path: '/modul/pendaftaran-guarantor/:id/edit', module: 'PendaftaranGuarantor', element: <Form_534 /> },
  { path: '/modul/pendaftaran-history', module: 'PendaftaranHistory', element: <List_535 /> },
  { path: '/modul/pendaftaran-history/tambah', module: 'PendaftaranHistory', element: <Form_535 /> },
  { path: '/modul/pendaftaran-history/:id/edit', module: 'PendaftaranHistory', element: <Form_535 /> },
  { path: '/modul/pendaftaran-patient-escort', module: 'PendaftaranPatientEscort', element: <List_536 /> },
  { path: '/modul/pendaftaran-patient-escort/tambah', module: 'PendaftaranPatientEscort', element: <Form_536 /> },
  { path: '/modul/pendaftaran-patient-escort/:id/edit', module: 'PendaftaranPatientEscort', element: <Form_536 /> },
  { path: '/modul/pendaftaran-patient-escort-contact', module: 'PendaftaranPatientEscortContact', element: <List_537 /> },
  { path: '/modul/pendaftaran-patient-escort-contact/tambah', module: 'PendaftaranPatientEscortContact', element: <Form_537 /> },
  { path: '/modul/pendaftaran-patient-escort-contact/:id/edit', module: 'PendaftaranPatientEscortContact', element: <Form_537 /> },
  { path: '/modul/pendaftaran-patient-escort-identity-card', module: 'PendaftaranPatientEscortIdentityCard', element: <List_538 /> },
  { path: '/modul/pendaftaran-patient-escort-identity-card/tambah', module: 'PendaftaranPatientEscortIdentityCard', element: <Form_538 /> },
  { path: '/modul/pendaftaran-patient-escort-identity-card/:id/edit', module: 'PendaftaranPatientEscortIdentityCard', element: <Form_538 /> },
  { path: '/modul/pendaftaran-patient-guardian', module: 'PendaftaranPatientGuardian', element: <List_539 /> },
  { path: '/modul/pendaftaran-patient-guardian/tambah', module: 'PendaftaranPatientGuardian', element: <Form_539 /> },
  { path: '/modul/pendaftaran-patient-guardian/:id/edit', module: 'PendaftaranPatientGuardian', element: <Form_539 /> },
  { path: '/modul/pendaftaran-patient-guardian-contact', module: 'PendaftaranPatientGuardianContact', element: <List_540 /> },
  { path: '/modul/pendaftaran-patient-guardian-contact/tambah', module: 'PendaftaranPatientGuardianContact', element: <Form_540 /> },
  { path: '/modul/pendaftaran-patient-guardian-contact/:id/edit', module: 'PendaftaranPatientGuardianContact', element: <Form_540 /> },
  { path: '/modul/pendaftaran-patient-guardian-identity-card', module: 'PendaftaranPatientGuardianIdentityCard', element: <List_541 /> },
  { path: '/modul/pendaftaran-patient-guardian-identity-card/tambah', module: 'PendaftaranPatientGuardianIdentityCard', element: <Form_541 /> },
  { path: '/modul/pendaftaran-patient-guardian-identity-card/:id/edit', module: 'PendaftaranPatientGuardianIdentityCard', element: <Form_541 /> },
  { path: '/modul/pendaftaran-patient-purpose', module: 'PendaftaranPatientPurpose', element: <List_542 /> },
  { path: '/modul/pendaftaran-patient-purpose/tambah', module: 'PendaftaranPatientPurpose', element: <Form_542 /> },
  { path: '/modul/pendaftaran-patient-purpose/:id/edit', module: 'PendaftaranPatientPurpose', element: <Form_542 /> },
  { path: '/modul/pendaftaran-patient-transfer', module: 'PendaftaranPatientTransfer', element: <List_543 /> },
  { path: '/modul/pendaftaran-patient-transfer/tambah', module: 'PendaftaranPatientTransfer', element: <Form_543 /> },
  { path: '/modul/pendaftaran-patient-transfer/:id/edit', module: 'PendaftaranPatientTransfer', element: <Form_543 /> },
  { path: '/modul/pendaftaran-queue-call', module: 'PendaftaranQueueCall', element: <List_544 /> },
  { path: '/modul/pendaftaran-queue-call/tambah', module: 'PendaftaranQueueCall', element: <Form_544 /> },
  { path: '/modul/pendaftaran-queue-call/:id/edit', module: 'PendaftaranQueueCall', element: <Form_544 /> },
  { path: '/modul/pendaftaran-referral', module: 'PendaftaranReferral', element: <List_545 /> },
  { path: '/modul/pendaftaran-referral/tambah', module: 'PendaftaranReferral', element: <Form_545 /> },
  { path: '/modul/pendaftaran-referral/:id/edit', module: 'PendaftaranReferral', element: <Form_545 /> },
  { path: '/modul/pendaftaran-referral-letter', module: 'PendaftaranReferralLetter', element: <List_546 /> },
  { path: '/modul/pendaftaran-referral-letter/tambah', module: 'PendaftaranReferralLetter', element: <Form_546 /> },
  { path: '/modul/pendaftaran-referral-letter/:id/edit', module: 'PendaftaranReferralLetter', element: <Form_546 /> },
  { path: '/modul/pendaftaran-registration', module: 'PendaftaranRegistration', element: <List_547 /> },
  { path: '/modul/pendaftaran-registration/tambah', module: 'PendaftaranRegistration', element: <Form_547 /> },
  { path: '/modul/pendaftaran-registration/:id/edit', module: 'PendaftaranRegistration', element: <Form_547 /> },
  { path: '/modul/pendaftaran-reservation', module: 'PendaftaranReservation', element: <List_548 /> },
  { path: '/modul/pendaftaran-reservation/tambah', module: 'PendaftaranReservation', element: <Form_548 /> },
  { path: '/modul/pendaftaran-reservation/:id/edit', module: 'PendaftaranReservation', element: <Form_548 /> },
  { path: '/modul/pendaftaran-service-handover', module: 'PendaftaranServiceHandover', element: <List_549 /> },
  { path: '/modul/pendaftaran-service-handover/tambah', module: 'PendaftaranServiceHandover', element: <Form_549 /> },
  { path: '/modul/pendaftaran-service-handover/:id/edit', module: 'PendaftaranServiceHandover', element: <Form_549 /> },
  { path: '/modul/pendaftaran-visit', module: 'PendaftaranVisit', element: <List_550 /> },
  { path: '/modul/pendaftaran-visit/tambah', module: 'PendaftaranVisit', element: <Form_550 /> },
  { path: '/modul/pendaftaran-visit/:id/edit', module: 'PendaftaranVisit', element: <Form_550 /> },
  { path: '/modul/pendaftaran-visit-cancellation', module: 'PendaftaranVisitCancellation', element: <List_551 /> },
  { path: '/modul/pendaftaran-visit-cancellation/tambah', module: 'PendaftaranVisitCancellation', element: <Form_551 /> },
  { path: '/modul/pendaftaran-visit-cancellation/:id/edit', module: 'PendaftaranVisitCancellation', element: <Form_551 /> },
  { path: '/modul/pendaftaran-visit-date-change', module: 'PendaftaranVisitDateChange', element: <List_552 /> },
  { path: '/modul/pendaftaran-visit-date-change/tambah', module: 'PendaftaranVisitDateChange', element: <Form_552 /> },
  { path: '/modul/pendaftaran-visit-date-change/:id/edit', module: 'PendaftaranVisitDateChange', element: <Form_552 /> },
  { path: '/modul/pendaftaran-ward-queue', module: 'PendaftaranWardQueue', element: <List_553 /> },
  { path: '/modul/pendaftaran-ward-queue/tambah', module: 'PendaftaranWardQueue', element: <Form_553 /> },
  { path: '/modul/pendaftaran-ward-queue/:id/edit', module: 'PendaftaranWardQueue', element: <Form_553 /> },
  { path: '/modul/penjamin-rsattending-physician', module: 'PenjaminRSAttendingPhysician', element: <List_554 /> },
  { path: '/modul/penjamin-rsattending-physician/tambah', module: 'PenjaminRSAttendingPhysician', element: <Form_554 /> },
  { path: '/modul/penjamin-rsattending-physician/:id/edit', module: 'PenjaminRSAttendingPhysician', element: <Form_554 /> },
  { path: '/modul/penjamin-rsclaim-driver', module: 'PenjaminRSClaimDriver', element: <List_555 /> },
  { path: '/modul/penjamin-rsclaim-driver/tambah', module: 'PenjaminRSClaimDriver', element: <Form_555 /> },
  { path: '/modul/penjamin-rsclaim-driver/:id/edit', module: 'PenjaminRSClaimDriver', element: <Form_555 /> },
  { path: '/modul/penjamin-rsdischarge-method', module: 'PenjaminRSDischargeMethod', element: <List_556 /> },
  { path: '/modul/penjamin-rsdischarge-method/tambah', module: 'PenjaminRSDischargeMethod', element: <Form_556 /> },
  { path: '/modul/penjamin-rsdischarge-method/:id/edit', module: 'PenjaminRSDischargeMethod', element: <Form_556 /> },
  { path: '/modul/penjualan-sale', module: 'PenjualanSale', element: <List_557 /> },
  { path: '/modul/penjualan-sale/tambah', module: 'PenjualanSale', element: <Form_557 /> },
  { path: '/modul/penjualan-sale/:id/edit', module: 'PenjualanSale', element: <Form_557 /> },
  { path: '/modul/penjualan-sale-item', module: 'PenjualanSaleItem', element: <List_558 /> },
  { path: '/modul/penjualan-sale-item/tambah', module: 'PenjualanSaleItem', element: <Form_558 /> },
  { path: '/modul/penjualan-sale-item/:id/edit', module: 'PenjualanSaleItem', element: <Form_558 /> },
  { path: '/modul/penjualan-sale-return', module: 'PenjualanSaleReturn', element: <List_559 /> },
  { path: '/modul/penjualan-sale-return/tambah', module: 'PenjualanSaleReturn', element: <Form_559 /> },
  { path: '/modul/penjualan-sale-return/:id/edit', module: 'PenjualanSaleReturn', element: <Form_559 /> },
  { path: '/modul/audit-activity-log-activity-logs', module: 'AuditActivityLog', element: <List_560 /> },
  { path: '/modul/audit-request-log-request-logs', module: 'AuditRequestLog', element: <List_561 /> },
  { path: '/modul/finance-general-ledger-account', module: 'FinanceGeneralLedger', element: <List_562 /> },
  { path: '/modul/finance-general-ledger-journal-entry', module: 'FinanceGeneralLedger', element: <List_563 /> },
  { path: '/modul/medical-record-retention-schedule-retention-schedule', module: 'MedicalRecordRetentionSchedule', element: <List_564 /> },
  { path: '/modul/satu-sehat-master-data-provinces', module: 'SatuSehatMasterData', element: <List_565 /> },
  { path: '/modul/satu-sehat-master-data-cities', module: 'SatuSehatMasterData', element: <List_566 /> },
  { path: '/modul/satu-sehat-master-data-districts', module: 'SatuSehatMasterData', element: <List_567 /> },
  { path: '/modul/satu-sehat-master-data-sub-districts', module: 'SatuSehatMasterData', element: <List_568 /> },
  { path: '/modul/satu-sehat-master-data-sarana', module: 'SatuSehatMasterData', element: <List_569 /> },
  { path: '/modul/satu-sehat-master-data-kfa-products', module: 'SatuSehatMasterData', element: <List_570 /> },
  { path: '/modul/satu-sehat-master-data-kfa-products-all', module: 'SatuSehatMasterData', element: <List_571 /> },
]
