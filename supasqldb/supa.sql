-- Create users table 
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users (id) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    type TEXT DEFAULT 'user' CHECK (type IN ('user', 'admin', 'regulator')),
    avatar_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_away BOOLEAN DEFAULT FALSE NOT NULL,
    phone TEXT,
    workplaces TEXT[],
    channels TEXT[]
);

-- Enable row level security on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Can view own user data." ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Can update own user data." ON users FOR UPDATE
    USING (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
    IF new.raw_user_meta_data->>'avatar_url' IS NULL OR new.raw_user_meta_data->>'avatar_url' = '' THEN
        new.raw_user_meta_data = jsonb_set(new.raw_user_meta_data, '{avatar_url}', '"https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"'::jsonb);
    END IF;
    INSERT INTO public.users (id, name, type, email, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', 'user', new.email, new.raw_user_meta_data->>'avatar_url');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to handle new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
