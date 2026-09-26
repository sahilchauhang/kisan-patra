import type { FarmerNotice } from "@/lib/types"

// Only add notices from an explicitly approved, versioned monitor proposal.
// Expired notices stay here for the archive; never delete their evidence.
export const farmerNotices: FarmerNotice[] = []
