export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string
          created_at: string | null
          document_type: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          document_type?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          document_type?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      extractions: {
        Row: {
          accuracy: number | null
          created_at: string | null
          document_id: string
          extracted_data: Json
          id: string
          processing_time_ms: number | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          created_at?: string | null
          document_id: string
          extracted_data: Json
          id?: string
          processing_time_ms?: number | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          created_at?: string | null
          document_id?: string
          extracted_data?: Json
          id?: string
          processing_time_ms?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "extractions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      usage: {
        Row: {
          created_at: string | null
          documents_processed: number | null
          extractions_count: number | null
          id: string
          month: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          documents_processed?: number | null
          extractions_count?: number | null
          id?: string
          month: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          documents_processed?: number | null
          extractions_count?: number | null
          id?: string
          month?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          credits: number | null
          email: string | null
          id: string
          plan: string | null
          stripe_customer_id: string | null
          total_documents_processed: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credits?: number | null
          email?: string | null
          id: string
          plan?: string | null
          stripe_customer_id?: string | null
          total_documents_processed?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credits?: number | null
          email?: string | null
          id?: string
          plan?: string | null
          stripe_customer_id?: string | null
          total_documents_processed?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      deduct_credit: {
        Args: {
          user_uuid: string
        }
        Returns: {
          message: string
          remaining_credits: number
          success: boolean
        }[]
      }
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

