export type UserDataType = {
    provider_token:         string;
    provider_refresh_token: string;
    access_token:           string;
    expires_in:             number;
    expires_at:             number;
    refresh_token:          string;
    token_type:             string;
    user:                   User;
}

export type User = {
    id:                   string;
    aud:                  string;
    role:                 string;
    email:                string;
    email_confirmed_at:   Date;
    phone:                string;
    confirmation_sent_at: Date;
    confirmed_at:         Date;
    last_sign_in_at:      Date;
    app_metadata:         AppMetadata;
    user_metadata:        Data;
    identities:           Identity[];
    created_at:           Date;
    updated_at:           Date;
}

export type AppMetadata = {
    provider:  string;
    providers: string[];
}

export type Identity = {
    identity_id:     string;
    id:              string;
    user_id:         string;
    identity_data:   Data;
    provider:        string;
    last_sign_in_at: Date;
    created_at:      Date;
    updated_at:      Date;
    email:           string;
}

export type Data = {
    email:           string;
    full_name:       string;
    email_verified?: boolean;
    phone_verified?: boolean;
    sub?:            string;
    avatar_url?:     string;
    iss?:            string;
    name?:           string;
    picture?:        string;
    provider_id?:    string;
}