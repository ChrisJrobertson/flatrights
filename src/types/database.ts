// Generated types for FlatRights Supabase schema
// Regenerate with: npx supabase gen types typescript --project-id bsqaranndomlkmaokdkb > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type BuildingRole = 'organiser' | 'member' | 'viewer'
export type RtmStatus = 'draft' | 'gathering_consent' | 'company_formed' | 'participation_notices_served' | 'claim_notice_served' | 'counter_notice_period' | 'counter_notice_received' | 'determination_pending' | 'determination_applied' | 'rtm_acquired' | 'failed' | 'withdrawn'
export type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped' | 'blocked'
export type ChallengeStatus = 'draft' | 'gathering_evidence' | 'letter_sent' | 'response_received' | 'ftt_application_draft' | 'ftt_application_submitted' | 'hearing_scheduled' | 'decided_in_favour' | 'decided_against' | 'settled' | 'withdrawn'
export type LeaseExtensionStatus = 'draft' | 'valuation_obtained' | 'initial_notice_served' | 'counter_notice_period' | 'counter_notice_received' | 'negotiating' | 'ftt_application' | 'terms_agreed' | 'completion' | 'completed' | 'withdrawn'
export type EnfranchisementStatus = 'draft' | 'gathering_participants' | 'valuation_stage' | 'initial_notice_served' | 'counter_notice_period' | 'counter_notice_received' | 'negotiating' | 'ftt_application' | 'terms_agreed' | 'nominee_purchaser_appointed' | 'conveyancing' | 'completed' | 'withdrawn' | 'failed'
export type OutcomeStatus = 'pending' | 'submitted' | 'skipped' | 'reminded'
export type DocumentType = 'participation_notice' | 'claim_notice' | 'counter_notice_response' | 'ftt_application' | 'bank_notification' | 'landlord_letter' | 'member_invitation' | 'consent_form' | 'service_charge_challenge' | 'section_20_response' | 'lease_extension_notice' | 'lease_extension_counter_response' | 'enfranchisement_initial_notice' | 'enfranchisement_counter_response' | 'participation_agreement'
export type ConsentMethod = 'online' | 'email' | 'paper' | 'in_person'
export type CheckerType = 'rtm' | 'enfranchisement' | 'service_charge' | 'lease_extension'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          phone: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          phone?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          phone?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      buildings: {
        Row: {
          id: string
          name: string
          address_line_1: string
          address_line_2: string | null
          city: string
          postcode: string
          total_flats: number
          qualifying_tenants: number | null
          non_residential_percentage: number | null
          has_resident_landlord: boolean | null
          landlord_name: string | null
          landlord_address: string | null
          managing_agent_name: string | null
          managing_agent_address: string | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          address_line_1: string
          address_line_2?: string | null
          city: string
          postcode: string
          total_flats: number
          qualifying_tenants?: number | null
          non_residential_percentage?: number | null
          has_resident_landlord?: boolean | null
          landlord_name?: string | null
          landlord_address?: string | null
          managing_agent_name?: string | null
          managing_agent_address?: string | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          address_line_1?: string
          address_line_2?: string | null
          city?: string
          postcode?: string
          total_flats?: number
          qualifying_tenants?: number | null
          non_residential_percentage?: number | null
          has_resident_landlord?: boolean | null
          landlord_name?: string | null
          landlord_address?: string | null
          managing_agent_name?: string | null
          managing_agent_address?: string | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      building_members: {
        Row: {
          id: string
          building_id: string
          user_id: string
          role: BuildingRole
          flat_number: string | null
          is_qualifying_tenant: boolean | null
          lease_start_date: string | null
          lease_original_term_years: number | null
          consent_given: boolean | null
          consent_given_at: string | null
          invited_by: string | null
          invited_email: string | null
          joined_at: string | null
        }
        Insert: {
          id?: string
          building_id: string
          user_id: string
          role?: BuildingRole
          flat_number?: string | null
          is_qualifying_tenant?: boolean | null
          lease_start_date?: string | null
          lease_original_term_years?: number | null
          consent_given?: boolean | null
          consent_given_at?: string | null
          invited_by?: string | null
          invited_email?: string | null
          joined_at?: string | null
        }
        Update: {
          id?: string
          building_id?: string
          user_id?: string
          role?: BuildingRole
          flat_number?: string | null
          is_qualifying_tenant?: boolean | null
          lease_start_date?: string | null
          lease_original_term_years?: number | null
          consent_given?: boolean | null
          consent_given_at?: string | null
          invited_by?: string | null
          invited_email?: string | null
          joined_at?: string | null
        }
      }
      rtm_claims: {
        Row: {
          id: string
          building_id: string
          status: RtmStatus
          rtm_company_name: string | null
          rtm_company_number: string | null
          rtm_company_registered_date: string | null
          participation_notice_date: string | null
          participation_notice_deadline: string | null
          claim_notice_date: string | null
          counter_notice_deadline: string | null
          counter_notice_received_date: string | null
          counter_notice_disputed: boolean | null
          determination_application_date: string | null
          determination_date: string | null
          acquisition_date: string | null
          landlord_costs_claimed: number | null
          costs_notes: string | null
          payment_tier: string | null
          payment_amount: number | null
          stripe_payment_id: string | null
          paid_at: string | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
          solicitor_review_requested: boolean | null
          solicitor_review_status: string | null
          solicitor_review_feedback: string | null
          solicitor_reviewed_at: string | null
          outcome_status: OutcomeStatus | null
          outcome_rtm_acquired: boolean | null
          outcome_acquisition_date_actual: string | null
          outcome_counter_notice_received: boolean | null
          outcome_ftt_application_required: boolean | null
          outcome_weeks_to_resolution: number | null
          outcome_submitted_at: string | null
          outcome_reminder_sent_at: string | null
        }
        Insert: {
          id?: string
          building_id: string
          status?: RtmStatus

        }
        Update: {

        }
      }
      rtm_tasks: {
        Row: {
          id: string
          claim_id: string
          sort_order: number
          title: string
          description: string | null
          statutory_reference: string | null
          status: TaskStatus
          due_date: string | null
          completed_at: string | null
          completed_by: string | null
          notes: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          claim_id: string
          sort_order: number
          title: string
          description?: string | null
          statutory_reference?: string | null
          status?: TaskStatus

        }
        Update: {

        }
      }
      rtm_consents: {
        Row: {
          id: string
          claim_id: string
          building_id: string
          flat_number: string
          leaseholder_name: string
          leaseholder_email: string | null
          is_qualifying_tenant: boolean | null
          consent_given: boolean | null
          consent_given_at: string | null
          consent_method: ConsentMethod | null
          user_id: string | null
          invited_at: string | null
          reminder_sent_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          claim_id: string
          building_id: string
          flat_number: string
          leaseholder_name: string

        }
        Update: {

        }
      }
      generated_documents: {
        Row: {
          id: string
          claim_id: string | null
          building_id: string
          document_type: DocumentType
          title: string
          content: string
          metadata: Json | null
          version: number | null
          is_final: boolean | null
          generated_by: string | null
          created_at: string | null
          updated_at: string | null
          solicitor_review_requested: boolean | null
          solicitor_review_status: string | null
          solicitor_review_feedback: string | null
          solicitor_reviewed_at: string | null
          solicitor_reviewer_name: string | null
          statutory_requirements_met: Json | null
        }
        Insert: {
          id?: string
          building_id: string
          document_type: DocumentType
          title: string
          content: string

        }
        Update: {

        }
      }
      eligibility_checks: {
        Row: {
          id: string
          postcode: string | null
          total_flats: number | null
          is_purpose_built: boolean | null
          non_residential_percentage: number | null
          has_resident_landlord: boolean | null
          flats_with_long_leases: number | null
          local_authority_landlord: boolean | null
          is_eligible: boolean | null
          ineligibility_reasons: string[] | null
          email: string | null
          wants_updates: boolean | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          referrer: string | null
          ip_hash: string | null
          created_at: string | null
          checker_type: CheckerType
          flat_value: number | null
          lease_years_remaining: number | null
          annual_service_charge: number | null
          result_data: Json | null
        }
        Insert: {
          id?: string
          checker_type?: CheckerType

        }
        Update: {

        }
      }
      service_charge_challenges: {
        Row: {
          id: string
          building_id: string
          status: ChallengeStatus
          charge_year: string
          total_charge_amount: number | null
          disputed_amount: number | null
          charge_categories: string[] | null
          challenge_grounds: string | null

        }
        Insert: {
          id?: string
          building_id: string
          charge_year: string

        }
        Update: {

        }
      }
      lease_extensions: {
        Row: {
          id: string
          building_id: string
          member_id: string
          status: LeaseExtensionStatus
          flat_number: string
          current_lease_years_remaining: number | null
          current_ground_rent: number | null
          flat_current_value: number | null
          estimated_premium: number | null

        }
        Insert: {
          id?: string
          building_id: string
          member_id: string
          flat_number: string

        }
        Update: {

        }
      }
      enfranchisement_claims: {
        Row: {
          id: string
          building_id: string
          status: EnfranchisementStatus
          participating_flats: number | null
          estimated_premium_total: number | null
          estimated_cost_per_flat: number | null

        }
        Insert: {
          id?: string
          building_id: string

        }
        Update: {

        }
      }
      enfranchisement_participants: {
        Row: {
          id: string
          claim_id: string
          building_id: string
          flat_number: string
          leaseholder_name: string
          leaseholder_email: string | null
          user_id: string | null
          is_participating: boolean | null
          share_of_cost: number | null
          amount_paid: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          claim_id: string
          building_id: string
          flat_number: string
          leaseholder_name: string

        }
        Update: {

        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rtm_eligibility: {
        Args: {
          p_total_flats: number
          p_is_purpose_built: boolean
          p_non_residential_percentage: number
          p_flats_with_long_leases: number
          p_has_resident_landlord: boolean
          p_local_authority_landlord: boolean
        }
        Returns: Json
      }
      create_building_with_claim: {
        Args: {
          p_name: string
          p_address_line_1: string
          p_address_line_2: string | null
          p_city: string
          p_postcode: string
          p_total_flats: number
          p_landlord_name: string | null
          p_landlord_address: string | null
        }
        Returns: Json
      }
    }
    Enums: {
      building_role: BuildingRole
      rtm_status: RtmStatus
      task_status: TaskStatus
      challenge_status: ChallengeStatus
      lease_extension_status: LeaseExtensionStatus
      enfranchisement_status: EnfranchisementStatus
      outcome_status: OutcomeStatus
      document_type: DocumentType
    }
  }
}
