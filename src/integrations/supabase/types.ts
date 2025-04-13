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
      daily_user_questions: {
        Row: {
          answered_at: string | null
          id: string
          is_correct: boolean | null
          question_id: string
          quiz_date: string
          user_answer: string | null
          user_id: string
        }
        Insert: {
          answered_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id: string
          quiz_date?: string
          user_answer?: string | null
          user_id: string
        }
        Update: {
          answered_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id?: string
          quiz_date?: string
          user_answer?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_user_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_user_questions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_notifications: {
        Row: {
          email_type: Database["public"]["Enums"]["email_type"]
          id: string
          opened: boolean | null
          sent_at: string | null
          user_id: string
        }
        Insert: {
          email_type: Database["public"]["Enums"]["email_type"]
          id?: string
          opened?: boolean | null
          sent_at?: string | null
          user_id: string
        }
        Update: {
          email_type?: Database["public"]["Enums"]["email_type"]
          id?: string
          opened?: boolean | null
          sent_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard: {
        Row: {
          daily_score: number | null
          date: string
          rank: number | null
          total_score: number | null
          user_id: string
        }
        Insert: {
          daily_score?: number | null
          date?: string
          rank?: number | null
          total_score?: number | null
          user_id: string
        }
        Update: {
          daily_score?: number | null
          date?: string
          rank?: number | null
          total_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          badge_count: number | null
          created_at: string | null
          daily_quiz_count: number | null
          email: string | null
          id: string
          last_active_at: string | null
          mobile: string | null
          name: string | null
          referral_code: string | null
          referred_by: string | null
          total_points: number | null
        }
        Insert: {
          badge_count?: number | null
          created_at?: string | null
          daily_quiz_count?: number | null
          email?: string | null
          id: string
          last_active_at?: string | null
          mobile?: string | null
          name?: string | null
          referral_code?: string | null
          referred_by?: string | null
          total_points?: number | null
        }
        Update: {
          badge_count?: number | null
          created_at?: string | null
          daily_quiz_count?: number | null
          email?: string | null
          id?: string
          last_active_at?: string | null
          mobile?: string | null
          name?: string | null
          referral_code?: string | null
          referred_by?: string | null
          total_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["referral_code"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_option: string
          created_at: string | null
          id: string
          is_active: boolean | null
          options: Json
          question_text: string
          source: Database["public"]["Enums"]["source_type"] | null
          tags: string[] | null
        }
        Insert: {
          correct_option: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          options: Json
          question_text: string
          source?: Database["public"]["Enums"]["source_type"] | null
          tags?: string[] | null
        }
        Update: {
          correct_option?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          options?: Json
          question_text?: string
          source?: Database["public"]["Enums"]["source_type"] | null
          tags?: string[] | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          id: string
          is_successful: boolean | null
          referral_date: string | null
          referred_user_id: string
          referrer_id: string
        }
        Insert: {
          id?: string
          is_successful?: boolean | null
          referral_date?: string | null
          referred_user_id: string
          referrer_id: string
        }
        Update: {
          id?: string
          is_successful?: boolean | null
          referral_date?: string | null
          referred_user_id?: string
          referrer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          points_required: number
          stock: number
          type: Database["public"]["Enums"]["reward_type"]
        }
        Insert: {
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          points_required: number
          stock?: number
          type: Database["public"]["Enums"]["reward_type"]
        }
        Update: {
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          points_required?: number
          stock?: number
          type?: Database["public"]["Enums"]["reward_type"]
        }
        Relationships: []
      }
      user_rewards: {
        Row: {
          id: string
          redeemed_at: string | null
          reward_id: string
          status: Database["public"]["Enums"]["redemption_status"] | null
          user_id: string
        }
        Insert: {
          id?: string
          redeemed_at?: string | null
          reward_id: string
          status?: Database["public"]["Enums"]["redemption_status"] | null
          user_id: string
        }
        Update: {
          id?: string
          redeemed_at?: string | null
          reward_id?: string
          status?: Database["public"]["Enums"]["redemption_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_rewards_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      email_type: "daily_reminder" | "reward_offer" | "winner_announcement"
      redemption_status: "pending" | "shipped" | "delivered"
      reward_type: "badge" | "merch" | "coupon"
      source_type: "manual" | "AI"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      email_type: ["daily_reminder", "reward_offer", "winner_announcement"],
      redemption_status: ["pending", "shipped", "delivered"],
      reward_type: ["badge", "merch", "coupon"],
      source_type: ["manual", "AI"],
    },
  },
} as const
