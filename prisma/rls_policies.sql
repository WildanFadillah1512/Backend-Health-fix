-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Supabase PostgreSQL Security Setup
-- =============================================

-- Enable RLS on all tables
-- This ensures no data can be accessed without explicit policies

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserPreferences" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Workout" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Exercise" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CustomWorkout" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Recipe" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ChatSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ChatMessage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CompletedWorkout" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Meal" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyStats" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WorkoutProgram" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProgramWorkout" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserProgram" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Achievement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserAchievement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WorkoutProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SystemSettings" ENABLE ROW LEVEL SECURITY;

-- =============================================
-- HELPER FUNCTION: Get Current User ID
-- =============================================
-- This function extracts firebaseUid from JWT token
-- Firebase sends uid in 'sub' claim of JWT

CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS TEXT AS $$
BEGIN
  -- Get Firebase UID from JWT 'sub' claim
  RETURN current_setting('request.jwt.claims', true)::json->>'sub';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- USER TABLE POLICIES
-- =============================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
ON "User"
FOR SELECT
USING (
  "firebaseUid" = get_current_user_id()
);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON "User"
FOR UPDATE
USING (
  "firebaseUid" = get_current_user_id()
)
WITH CHECK (
  "firebaseUid" = get_current_user_id()
);

-- Users can insert their own profile (first time)
CREATE POLICY "Users can create own profile"
ON "User"
FOR INSERT
WITH CHECK (
  "firebaseUid" = get_current_user_id()
);

-- =============================================
-- USER PREFERENCES POLICIES
-- =============================================

CREATE POLICY "Users can view own preferences"
ON "UserPreferences"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UserPreferences"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can update own preferences"
ON "UserPreferences"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UserPreferences"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own preferences"
ON "UserPreferences"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UserPreferences"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- WORKOUT & EXERCISE POLICIES (PUBLIC READ)
-- =============================================
-- Workouts are global content, readable by all authenticated users

CREATE POLICY "Anyone can view active workouts"
ON "Workout"
FOR SELECT
USING ("isActive" = true);

CREATE POLICY "Anyone can view exercises"
ON "Exercise"
FOR SELECT
USING (true);

-- =============================================
-- CUSTOM WORKOUT POLICIES
-- =============================================

CREATE POLICY "Users can view own custom workouts"
ON "CustomWorkout"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "CustomWorkout"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own custom workouts"
ON "CustomWorkout"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "CustomWorkout"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can update own custom workouts"
ON "CustomWorkout"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "CustomWorkout"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can delete own custom workouts"
ON "CustomWorkout"
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "CustomWorkout"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- RECIPE POLICIES (PUBLIC READ)
-- =============================================

CREATE POLICY "Anyone can view recipes"
ON "Recipe"
FOR SELECT
USING (true);

-- =============================================
-- NOTIFICATION POLICIES
-- =============================================

CREATE POLICY "Users can view own notifications"
ON "Notification"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Notification"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can update own notifications"
ON "Notification"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Notification"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- CHAT SESSION & MESSAGES POLICIES
-- =============================================

CREATE POLICY "Users can view own chat sessions"
ON "ChatSession"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "ChatSession"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own chat sessions"
ON "ChatSession"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "ChatSession"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can view own chat messages"
ON "ChatMessage"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "ChatSession"
    JOIN "User" ON "User".id = "ChatSession"."userId"
    WHERE "ChatSession".id = "ChatMessage"."sessionId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own chat messages"
ON "ChatMessage"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "ChatSession"
    JOIN "User" ON "User".id = "ChatSession"."userId"
    WHERE "ChatSession".id = "ChatMessage"."sessionId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- COMPLETED WORKOUT POLICIES
-- =============================================

CREATE POLICY "Users can view own completed workouts"
ON "CompletedWorkout"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "CompletedWorkout"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own completed workouts"
ON "CompletedWorkout"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "CompletedWorkout"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- MEAL POLICIES
-- =============================================

CREATE POLICY "Users can view own meals"
ON "Meal"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Meal"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own meals"
ON "Meal"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Meal"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can update own meals"
ON "Meal"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Meal"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can delete own meals"
ON "Meal"
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Meal"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- DAILY STATS POLICIES
-- =============================================

CREATE POLICY "Users can view own daily stats"
ON "DailyStats"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "DailyStats"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own daily stats"
ON "DailyStats"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "DailyStats"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can update own daily stats"
ON "DailyStats"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "DailyStats"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- WORKOUT PROGRAM POLICIES (PUBLIC READ)
-- =============================================

CREATE POLICY "Anyone can view workout programs"
ON "WorkoutProgram"
FOR SELECT
USING (true);

CREATE POLICY "Anyone can view program workouts"
ON "ProgramWorkout"
FOR SELECT
USING (true);

-- =============================================
-- USER PROGRAM POLICIES (ENROLLMENT)
-- =============================================

CREATE POLICY "Users can view own program enrollments"
ON "UserProgram"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UserProgram"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own program enrollments"
ON "UserProgram"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UserProgram"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can update own program enrollments"
ON "UserProgram"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UserProgram"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- ACHIEVEMENT POLICIES
-- =============================================

CREATE POLICY "Anyone can view achievements"
ON "Achievement"
FOR SELECT
USING (true);

CREATE POLICY "Users can view own user achievements"
ON "UserAchievement"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UserAchievement"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own user achievements"
ON "UserAchievement"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "UserAchievement"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- WORKOUT PROGRESS POLICIES
-- =============================================

CREATE POLICY "Users can view own workout progress"
ON "WorkoutProgress"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "WorkoutProgress"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can create own workout progress"
ON "WorkoutProgress"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "WorkoutProgress"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

CREATE POLICY "Users can update own workout progress"
ON "WorkoutProgress"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "WorkoutProgress"."userId"
    AND "User"."firebaseUid" = get_current_user_id()
  )
);

-- =============================================
-- SYSTEM SETTINGS POLICIES (READ-ONLY)
-- =============================================

CREATE POLICY "Anyone can view system settings"
ON "SystemSettings"
FOR SELECT
USING (true);

-- =============================================
-- NOTES
-- =============================================
-- 1. All user-specific data protected by firebaseUid check
-- 2. Global content (Workouts, Recipes, Achievements) readable by all
-- 3. Users can only modify their own data
-- 4. JWT token dari Firebase digunakan untuk authentication
-- 5. Backend middleware harus attach Firebase token ke setiap request
