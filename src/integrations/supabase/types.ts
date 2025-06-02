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
      content: {
        Row: {
          average_difficulty: number | null
          content_version: number | null
          created_at: string | null
          duration_hours: number | null
          estimated_read_time_minutes: number | null
          full_summary: string | null
          id: string
          insights: Json | null
          processed_at: string | null
          processing_status:
            | Database["public"]["Enums"]["processing_status"]
            | null
          questions: Json | null
          quick_summary: string | null
          source: Database["public"]["Enums"]["content_source"]
          source_url: string | null
          summary: string | null
          title: string
          topics: string[] | null
          total_questions: number | null
          transcript: string | null
        }
        Insert: {
          average_difficulty?: number | null
          content_version?: number | null
          created_at?: string | null
          duration_hours?: number | null
          estimated_read_time_minutes?: number | null
          full_summary?: string | null
          id?: string
          insights?: Json | null
          processed_at?: string | null
          processing_status?:
            | Database["public"]["Enums"]["processing_status"]
            | null
          questions?: Json | null
          quick_summary?: string | null
          source: Database["public"]["Enums"]["content_source"]
          source_url?: string | null
          summary?: string | null
          title: string
          topics?: string[] | null
          total_questions?: number | null
          transcript?: string | null
        }
        Update: {
          average_difficulty?: number | null
          content_version?: number | null
          created_at?: string | null
          duration_hours?: number | null
          estimated_read_time_minutes?: number | null
          full_summary?: string | null
          id?: string
          insights?: Json | null
          processed_at?: string | null
          processing_status?:
            | Database["public"]["Enums"]["processing_status"]
            | null
          questions?: Json | null
          quick_summary?: string | null
          source?: Database["public"]["Enums"]["content_source"]
          source_url?: string | null
          summary?: string | null
          title?: string
          topics?: string[] | null
          total_questions?: number | null
          transcript?: string | null
        }
        Relationships: []
      }
      episode_topics: {
        Row: {
          assigned_by_ai: boolean | null
          assigned_by_user: boolean | null
          confidence_score: number | null
          content_id: string
          created_at: string | null
          id: string
          question_allocation_weight: number | null
          relevance_score: number | null
          topic_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_by_ai?: boolean | null
          assigned_by_user?: boolean | null
          confidence_score?: number | null
          content_id: string
          created_at?: string | null
          id?: string
          question_allocation_weight?: number | null
          relevance_score?: number | null
          topic_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_by_ai?: boolean | null
          assigned_by_user?: boolean | null
          confidence_score?: number | null
          content_id?: string
          created_at?: string | null
          id?: string
          question_allocation_weight?: number | null
          relevance_score?: number | null
          topic_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "episode_topics_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "episode_topics_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "user_content_with_progress"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "episode_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topic_learning_overview"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "episode_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_sessions: {
        Row: {
          actual_duration_minutes: number | null
          average_response_time_seconds: number | null
          completed_at: string | null
          content_ids: string[]
          created_at: string | null
          device_type: string | null
          id: string
          interrupted_at: string | null
          planned_duration_minutes: number
          planned_question_count: number | null
          questions_answered: number | null
          questions_correct: number | null
          session_completion_rate: number | null
          session_type: Database["public"]["Enums"]["session_type"]
          started_at: string | null
          summaries_read: number | null
          user_id: string
          user_satisfaction_rating: number | null
        }
        Insert: {
          actual_duration_minutes?: number | null
          average_response_time_seconds?: number | null
          completed_at?: string | null
          content_ids: string[]
          created_at?: string | null
          device_type?: string | null
          id?: string
          interrupted_at?: string | null
          planned_duration_minutes: number
          planned_question_count?: number | null
          questions_answered?: number | null
          questions_correct?: number | null
          session_completion_rate?: number | null
          session_type: Database["public"]["Enums"]["session_type"]
          started_at?: string | null
          summaries_read?: number | null
          user_id: string
          user_satisfaction_rating?: number | null
        }
        Update: {
          actual_duration_minutes?: number | null
          average_response_time_seconds?: number | null
          completed_at?: string | null
          content_ids?: string[]
          created_at?: string | null
          device_type?: string | null
          id?: string
          interrupted_at?: string | null
          planned_duration_minutes?: number
          planned_question_count?: number | null
          questions_answered?: number | null
          questions_correct?: number | null
          session_completion_rate?: number | null
          session_type?: Database["public"]["Enums"]["session_type"]
          started_at?: string | null
          summaries_read?: number | null
          user_id?: string
          user_satisfaction_rating?: number | null
        }
        Relationships: []
      }
      topics: {
        Row: {
          active_learners_count: number | null
          color: string | null
          content_count: number | null
          created_at: string | null
          depth_level: number | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_topic_id: string | null
          slug: string
          sort_order: number | null
          total_questions: number | null
          updated_at: string | null
        }
        Insert: {
          active_learners_count?: number | null
          color?: string | null
          content_count?: number | null
          created_at?: string | null
          depth_level?: number | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_topic_id?: string | null
          slug: string
          sort_order?: number | null
          total_questions?: number | null
          updated_at?: string | null
        }
        Update: {
          active_learners_count?: number | null
          color?: string | null
          content_count?: number | null
          created_at?: string | null
          depth_level?: number | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_topic_id?: string | null
          slug?: string
          sort_order?: number | null
          total_questions?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "topics_parent_topic_id_fkey"
            columns: ["parent_topic_id"]
            isOneToOne: false
            referencedRelation: "topic_learning_overview"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topics_parent_topic_id_fkey"
            columns: ["parent_topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      user_content_library: {
        Row: {
          added_at: string | null
          content_id: string
          id: string
          last_accessed_at: string | null
          mastery_percentage: number | null
          next_review_due_at: string | null
          notes: string | null
          preferred_session_length: number | null
          questions_due_count: number | null
          total_questions_answered: number | null
          total_questions_correct: number | null
          total_sessions: number | null
          total_time_minutes: number | null
          user_id: string
        }
        Insert: {
          added_at?: string | null
          content_id: string
          id?: string
          last_accessed_at?: string | null
          mastery_percentage?: number | null
          next_review_due_at?: string | null
          notes?: string | null
          preferred_session_length?: number | null
          questions_due_count?: number | null
          total_questions_answered?: number | null
          total_questions_correct?: number | null
          total_sessions?: number | null
          total_time_minutes?: number | null
          user_id: string
        }
        Update: {
          added_at?: string | null
          content_id?: string
          id?: string
          last_accessed_at?: string | null
          mastery_percentage?: number | null
          next_review_due_at?: string | null
          notes?: string | null
          preferred_session_length?: number | null
          questions_due_count?: number | null
          total_questions_answered?: number | null
          total_questions_correct?: number | null
          total_sessions?: number | null
          total_time_minutes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_content_library_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_content_library_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "user_content_with_progress"
            referencedColumns: ["content_id"]
          },
        ]
      }
      user_question_progress: {
        Row: {
          consecutive_correct: number | null
          content_id: string
          correct_reviews: number | null
          created_at: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          ease_factor: number | null
          id: string
          interval_days: number | null
          last_feedback: Database["public"]["Enums"]["feedback_type"] | null
          last_response_time_seconds: number | null
          last_reviewed_at: string | null
          next_review_date: string
          question_id: string
          repetitions: number | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          consecutive_correct?: number | null
          content_id: string
          correct_reviews?: number | null
          created_at?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          ease_factor?: number | null
          id?: string
          interval_days?: number | null
          last_feedback?: Database["public"]["Enums"]["feedback_type"] | null
          last_response_time_seconds?: number | null
          last_reviewed_at?: string | null
          next_review_date?: string
          question_id: string
          repetitions?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          consecutive_correct?: number | null
          content_id?: string
          correct_reviews?: number | null
          created_at?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"]
            | null
          ease_factor?: number | null
          id?: string
          interval_days?: number | null
          last_feedback?: Database["public"]["Enums"]["feedback_type"] | null
          last_response_time_seconds?: number | null
          last_reviewed_at?: string | null
          next_review_date?: string
          question_id?: string
          repetitions?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_question_progress_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_question_progress_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "user_content_with_progress"
            referencedColumns: ["content_id"]
          },
        ]
      }
    }
    Views: {
      topic_learning_overview: {
        Row: {
          active_learners: number | null
          avg_difficulty: number | null
          avg_mastery_percentage: number | null
          avg_relevance_score: number | null
          color: string | null
          content_count: number | null
          description: string | null
          icon: string | null
          is_active: boolean | null
          name: string | null
          slug: string | null
          sort_order: number | null
          topic_id: string | null
          total_questions: number | null
          total_sessions: number | null
        }
        Relationships: []
      }
      user_content_with_progress: {
        Row: {
          added_at: string | null
          avg_session_accuracy: number | null
          content_id: string | null
          duration_hours: number | null
          estimated_read_time_minutes: number | null
          last_session_at: string | null
          mastery_percentage: number | null
          next_review_due_at: string | null
          preferred_session_length: number | null
          questions_due_count: number | null
          source: Database["public"]["Enums"]["content_source"] | null
          title: string | null
          topic_colors: string[] | null
          topic_names: string[] | null
          total_questions: number | null
          user_id: string | null
        }
        Relationships: []
      }
      user_learning_analytics: {
        Row: {
          avg_mastery_percentage: number | null
          content_accessed_this_week: number | null
          content_with_due_questions: number | null
          mastered_content_count: number | null
          next_review_due: string | null
          sessions_this_week: number | null
          struggling_content_count: number | null
          total_content_items: number | null
          total_due_questions: number | null
          total_sessions: number | null
          total_time_minutes: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_content_mastery: {
        Args: { user_id_param: string; content_id_param: string }
        Returns: {
          mastery_percentage: number
          questions_mastered: number
          questions_total: number
          next_review_due_at: string
        }[]
      }
      calculate_sm2_review: {
        Args: {
          current_ease_factor: number
          current_interval_days: number
          current_repetitions: number
          performance_quality: number
        }
        Returns: {
          next_ease_factor: number
          next_interval_days: number
          next_repetitions: number
          next_review_date: string
        }[]
      }
      get_user_due_questions: {
        Args: {
          user_id_param: string
          content_ids_param?: string[]
          max_questions_param?: number
          difficulty_preference_param?: Database["public"]["Enums"]["difficulty_level"]
          include_overdue_param?: boolean
        }
        Returns: {
          content_id: string
          question_id: string
          question: Json
          days_overdue: number
          priority_score: number
        }[]
      }
      update_question_progress: {
        Args: {
          user_id_param: string
          question_responses: Json
          session_id_param: string
        }
        Returns: {
          updated_count: number
          next_review_dates: Json
        }[]
      }
    }
    Enums: {
      confidence_level: "high" | "medium" | "low"
      content_source:
        | "podcast"
        | "video"
        | "article"
        | "book"
        | "conversation"
        | "interview"
        | "lecture"
        | "other"
      difficulty_level: "1" | "2" | "3" | "4" | "5"
      feedback_type: "got_it" | "revisit"
      processing_status: "pending" | "processing" | "completed" | "failed"
      question_type: "conceptual" | "factual" | "application" | "reflection"
      session_type: "read_summaries" | "test_knowledge" | "both"
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
      confidence_level: ["high", "medium", "low"],
      content_source: [
        "podcast",
        "video",
        "article",
        "book",
        "conversation",
        "interview",
        "lecture",
        "other",
      ],
      difficulty_level: ["1", "2", "3", "4", "5"],
      feedback_type: ["got_it", "revisit"],
      processing_status: ["pending", "processing", "completed", "failed"],
      question_type: ["conceptual", "factual", "application", "reflection"],
      session_type: ["read_summaries", "test_knowledge", "both"],
    },
  },
} as const
