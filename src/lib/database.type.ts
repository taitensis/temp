export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null;
          id: string;
        };
        Insert: {
          created_at?: string | null;
          id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          created_at: string | null;
          icon: string | null;
          id: string;
          name: string;
          position: number | null;
          slug: string;
        };
        Insert: {
          created_at?: string | null;
          icon?: string | null;
          id?: string;
          name: string;
          position?: number | null;
          slug: string;
        };
        Update: {
          created_at?: string | null;
          icon?: string | null;
          id?: string;
          name?: string;
          position?: number | null;
          slug?: string;
        };
        Relationships: [];
      };
      category_translations: {
        Row: {
          category_id: string | null;
          description: string | null;
          id: string;
          lang: Database['public']['Enums']['lang'];
          name: string;
        };
        Insert: {
          category_id?: string | null;
          description?: string | null;
          id?: string;
          lang: Database['public']['Enums']['lang'];
          name: string;
        };
        Update: {
          category_id?: string | null;
          description?: string | null;
          id?: string;
          lang?: Database['public']['Enums']['lang'];
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'category_translations_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      ingredient_translations: {
        Row: {
          id: string;
          ingredient_id: string | null;
          lang: Database['public']['Enums']['lang'];
          name: string;
        };
        Insert: {
          id?: string;
          ingredient_id?: string | null;
          lang: Database['public']['Enums']['lang'];
          name: string;
        };
        Update: {
          id?: string;
          ingredient_id?: string | null;
          lang?: Database['public']['Enums']['lang'];
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ingredient_translations_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
        ];
      };
      ingredients: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      recipe_categories: {
        Row: {
          category_id: string | null;
          id: string;
          is_primary: boolean | null;
          recipe_id: string | null;
        };
        Insert: {
          category_id?: string | null;
          id?: string;
          is_primary?: boolean | null;
          recipe_id?: string | null;
        };
        Update: {
          category_id?: string | null;
          id?: string;
          is_primary?: boolean | null;
          recipe_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_categories_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_categories_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_categories_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_categories_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_ingredients: {
        Row: {
          created_at: string | null;
          id: string;
          ingredient_id: string | null;
          note: string | null;
          position: number | null;
          quantity: number | null;
          recipe_id: string | null;
          section: string | null;
          unit: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          ingredient_id?: string | null;
          note?: string | null;
          position?: number | null;
          quantity?: number | null;
          recipe_id?: string | null;
          section?: string | null;
          unit?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          ingredient_id?: string | null;
          note?: string | null;
          position?: number | null;
          quantity?: number | null;
          recipe_id?: string | null;
          section?: string | null;
          unit?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_ingredients_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_ingredients_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_ingredients_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_ingredients_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_nutrition: {
        Row: {
          calories: number | null;
          carbs: number | null;
          created_at: string | null;
          fat: number | null;
          fiber: number | null;
          id: string;
          monounsaturated_fat: number | null;
          polyunsaturated_fat: number | null;
          protein: number | null;
          recipe_id: string | null;
          saturated_fat: number | null;
          sodium: number | null;
          sugar: number | null;
          trans_fat: number | null;
        };
        Insert: {
          calories?: number | null;
          carbs?: number | null;
          created_at?: string | null;
          fat?: number | null;
          fiber?: number | null;
          id?: string;
          monounsaturated_fat?: number | null;
          polyunsaturated_fat?: number | null;
          protein?: number | null;
          recipe_id?: string | null;
          saturated_fat?: number | null;
          sodium?: number | null;
          sugar?: number | null;
          trans_fat?: number | null;
        };
        Update: {
          calories?: number | null;
          carbs?: number | null;
          created_at?: string | null;
          fat?: number | null;
          fiber?: number | null;
          id?: string;
          monounsaturated_fat?: number | null;
          polyunsaturated_fat?: number | null;
          protein?: number | null;
          recipe_id?: string | null;
          saturated_fat?: number | null;
          sodium?: number | null;
          sugar?: number | null;
          trans_fat?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_nutrition_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: true;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_nutrition_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: true;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_nutrition_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: true;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_ratings: {
        Row: {
          comment: string | null;
          created_at: string | null;
          id: string;
          rating: number | null;
          recipe_id: string | null;
          user_id: string | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          rating?: number | null;
          recipe_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          rating?: number | null;
          recipe_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_ratings_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_ratings_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_ratings_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_step_translations: {
        Row: {
          id: string;
          instruction: string;
          lang: Database['public']['Enums']['lang'];
          recipe_step_id: string | null;
        };
        Insert: {
          id?: string;
          instruction: string;
          lang: Database['public']['Enums']['lang'];
          recipe_step_id?: string | null;
        };
        Update: {
          id?: string;
          instruction?: string;
          lang?: Database['public']['Enums']['lang'];
          recipe_step_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_step_translations_recipe_step_id_fkey';
            columns: ['recipe_step_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_steps';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_steps: {
        Row: {
          created_at: string | null;
          id: string;
          instruction: string;
          note: string | null;
          position: number;
          recipe_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          instruction: string;
          note?: string | null;
          position: number;
          recipe_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          instruction?: string;
          note?: string | null;
          position?: number;
          recipe_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_steps_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_steps_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_steps_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_tags: {
        Row: {
          created_at: string | null;
          id: string;
          recipe_id: string | null;
          tag_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          recipe_id?: string | null;
          tag_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          recipe_id?: string | null;
          tag_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_tags_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_tags_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_tags_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_times: {
        Row: {
          created_at: string | null;
          id: string;
          minutes: number;
          recipe_id: string | null;
          times_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          minutes: number;
          recipe_id?: string | null;
          times_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          minutes?: number;
          recipe_id?: string | null;
          times_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_times_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_times_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_times_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_times_times_id_fkey';
            columns: ['times_id'];
            isOneToOne: false;
            referencedRelation: 'times';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_translations: {
        Row: {
          description: string | null;
          id: string;
          lang: Database['public']['Enums']['lang'];
          recipe_id: string | null;
          title: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          lang: Database['public']['Enums']['lang'];
          recipe_id?: string | null;
          title: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          lang?: Database['public']['Enums']['lang'];
          recipe_id?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_translations_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_translations_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_translations_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
        ];
      };
      recipes: {
        Row: {
          cook_time: number | null;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          difficulty: string | null;
          featured: boolean | null;
          id: string;
          image_url: string | null;
          prep_time: number | null;
          rating: number | null;
          rating_count: number | null;
          season: string[] | null;
          serving_type: string | null;
          servings: number | null;
          slug: string;
          source_url: string | null;
          title: string;
          total_time: number | null;
          updated_at: string | null;
          video_url: string | null;
          view_count: number | null;
        };
        Insert: {
          cook_time?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          difficulty?: string | null;
          featured?: boolean | null;
          id?: string;
          image_url?: string | null;
          prep_time?: number | null;
          rating?: number | null;
          rating_count?: number | null;
          season?: string[] | null;
          serving_type?: string | null;
          servings?: number | null;
          slug: string;
          source_url?: string | null;
          title: string;
          total_time?: number | null;
          updated_at?: string | null;
          video_url?: string | null;
          view_count?: number | null;
        };
        Update: {
          cook_time?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          difficulty?: string | null;
          featured?: boolean | null;
          id?: string;
          image_url?: string | null;
          prep_time?: number | null;
          rating?: number | null;
          rating_count?: number | null;
          season?: string[] | null;
          serving_type?: string | null;
          servings?: number | null;
          slug?: string;
          source_url?: string | null;
          title?: string;
          total_time?: number | null;
          updated_at?: string | null;
          video_url?: string | null;
          view_count?: number | null;
        };
        Relationships: [];
      };
      tag_translations: {
        Row: {
          id: string;
          lang: Database['public']['Enums']['lang'];
          name: string;
          tag_id: string | null;
        };
        Insert: {
          id?: string;
          lang: Database['public']['Enums']['lang'];
          name: string;
          tag_id?: string | null;
        };
        Update: {
          id?: string;
          lang?: Database['public']['Enums']['lang'];
          name?: string;
          tag_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'tag_translations_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
        ];
      };
      tags: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      times: {
        Row: {
          created_at: string | null;
          id: string;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      user_favorites: {
        Row: {
          created_at: string | null;
          id: string;
          recipe_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          recipe_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          recipe_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_favorites_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipe_cards_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_favorites_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_favorites_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'v_full_recipe';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      recipe_cards_view: {
        Row: {
          avg_rating: number | null;
          calories: number | null;
          cook_time: number | null;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          difficulty: string | null;
          favorite_count: number | null;
          featured: boolean | null;
          id: string | null;
          image_url: string | null;
          prep_time: number | null;
          protein: number | null;
          rating: number | null;
          rating_count: number | null;
          season: string[] | null;
          serving_type: string | null;
          servings: number | null;
          slug: string | null;
          source_url: string | null;
          title: string | null;
          total_time: number | null;
          updated_at: string | null;
          video_url: string | null;
          view_count: number | null;
        };
        Relationships: [];
      };
      v_full_recipe: {
        Row: {
          calories: number | null;
          carbs: number | null;
          description: string | null;
          fat: number | null;
          featured: boolean | null;
          fiber: number | null;
          id: string | null;
          image_url: string | null;
          protein: number | null;
          salt: number | null;
          season: string[] | null;
          servings: number | null;
          slug: string | null;
          sugar: number | null;
          title: string | null;
          total_time: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      show_limit: { Args: never; Returns: number };
      show_trgm: { Args: { '': string }; Returns: string[] };
    };
    Enums: {
      lang: 'en' | 'es' | 'fr' | 'nl';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      lang: ['en', 'es', 'fr', 'nl'],
    },
  },
} as const;
