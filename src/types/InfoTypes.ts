import { TripData } from "./Trip";

export interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
}

export interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  showReviewModal: () => void;
  numberOfChildren?: number;
  numberOfBeneficiaries?: number;
  numberOfAdults?: number;
  aTrip?: TripData | null;
}