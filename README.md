# Social Media Clone

This project was created to learn about full stack applications by replicating Instagram.

I am using a free plan at render.com which will shut down my backend after 15 minutes of inactivity. So the first load will take around 30 seconds to start the backend.

**Link to project:** https://john-denny-social-media-clone.onrender.com/

**Guest Account** username: guest password: !Aa12345

## Features

- **Authentication:**

  Impletemented using the Urql client, JSON Web Tokens (JWT) and httpOnly cookies. I used access and refresh tokens to maintain a user's login session, where the access token is used to access protected routes and the refresh token is used to obtain a new access token when the previous one has expired. Refresh tokens are securely stored in HttpOnly cookies. Additionally, I implemented encryption with salting for passwords.

- **Caching:**

  I used the Urql library to cache GraphQL responses and invalidate them when new data is avialiable through websockets or the user adds or changes data.

- **User Profiles:**

  The user profile allows users to customize their personal profiles. Users can upload profile pictures and cover photos, add personal information such as their name, location, and a biography. In addition to this, users can also create and manage their own posts from their profile page. They can view their own posts, edit or delete them, and also see who has liked or commented on them. User profiles allow users to follow and unfollow other users, view the profiles of those they are following, and view the followers of their own profile.

- **Image Uploader and Editor:**

  The image editor can adjust the brightness, contrast, saturation, and hue. It can also apply a variety of filters. Additionally, the image editor allows users to crop, rotate, and resize up to ten images in a gallery. This can then be posted along side text, hashtags, location tags and profile tags to specific locations on the image.

- **Posts:**
- **Messages:**
- **Activity:**
- **Content Feeds:**
- **Mobile Layout**

## Languages & Frameworks

- **HTML**
- **CSS**
- **Typescript**
- **React**

## Libraries

- **Urql with Graphql and Graphql-ws**
- **Styled Components**
- **React Router**
- **React Leaflet**

## API's

- **Open Street Maps**
- **Cloudinary**

## Optimizations

## Lessons Learned:
