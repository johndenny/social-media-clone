import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./routes/Home";
import { Reset } from "./routes/Accounts/Password/Reset";
import { Login } from "./routes/Accounts/Login";
import { Confirm } from "./routes/Accounts/Password/Confirm";
import { SignUp } from "./routes/Accounts/SignUp";
import { Email } from "./routes/Accounts/SignUp/Email";
import { ConfirmEmail } from "./routes/Accounts/SignUp/ConfirmEmail";
import { Name } from "./routes/Accounts/SignUp/Name";
import { Username } from "./routes/Accounts/SignUp/Username";
import { Accounts } from "./routes/Accounts";
import { EmailSignUp } from "./routes/Accounts/SignUp/EmailSignUp";
import { Profile } from "./routes/Profile";
import { Edit } from "./routes/Accounts/Edit";
import { Register } from "./routes/Accounts/components/Register";
import { Style } from "./routes/Create/Style";
import { ProfileRoot } from "./routes/Profile/ProfileRoot";
import { ProfileFeed } from "./routes/Profile/ProfileFeed";
import { Tagged } from "./routes/Profile/Tagged";
import { Following } from "./routes/Profile/Following";
import { Followers } from "./routes/Profile/Followers";
import { Saved } from "./routes/Profile/Saved";
import { Details } from "./routes/Create/Details";
import { Create } from "./routes/Create";
import { Tag } from "./routes/Create/Tag";
import { Explore } from "./routes/Explore";
import { Search } from "./routes/Explore/Search";
import { Post } from "./routes/Post";
import { LikedBy } from "./routes/Post/LikedBy";
import { Comments } from "./routes/Post/Comments";
import { LikedByComment } from "./routes/Post/Comments/LikedByComment";
import { UniqueComment } from "./routes/Post/Comments/UniqueComment";
import { Tags } from "./routes/Explore/Tags";
import { People } from "./routes/Explore/People";
import { ExplorePosts } from "./routes/Explore/ExplorePosts";
import { Inbox } from "./routes/Direct/Inbox";
import { NewMessage } from "./routes/Direct/NewMessage";
import { Chat } from "./routes/Direct/Chat";
import { Activity } from "./routes/Accounts/Activity";
import { Direct } from "./routes/Direct";
import { Modal } from "./components/Modal";
import { LikedByReplies } from "./routes/Post/Comments/LikedByReplies";
import { Change } from "./routes/Accounts/Password/Change";
import { PrivacyAndSecurity } from "./routes/Accounts/PrivacyAndSecurity";
import { Location } from "./routes/Create/Location";
import { Locations } from "./routes/Explore/Locations";
import { NewCollection } from "./routes/Profile/Saved/NewCollection";
import { Collection } from "./routes/Profile/Saved/Collection";
import { AllPosts } from "./routes/Profile/Saved/AllPosts";
import { PostSelection } from "./routes/Profile/Saved/Collection/PostSelection";
import { EditCollection } from "./routes/Profile/Saved/Collection/EditCollection";
import { ModalContextDataProvider } from "./context/ModalContext";
import useGlobalContext from "./hooks/useGlobalContext";
import { globalContextType } from "./context/GlobalContext";

export interface LocationState {
  background: string;
}

function App() {
  const location = useLocation();
  const { viewer } = useGlobalContext() as globalContextType;
  const background = (location.state as LocationState)?.background;
  const isLoggedIn = Boolean(viewer.data);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/:username" element={<Profile />}>
            <Route path="/:username" element={<ProfileRoot />} />
            <Route path="feed" element={<ProfileFeed />} />
            <Route path="saved" element={<Saved />} />
            <Route path="tagged" element={<Tagged />} />
          </Route>

          <Route path="accounts" element={<Navigate to="/" replace />} />
          <Route path="accounts" element={<Register />}>
            <Route path="login" element={<Login />} />
            <Route path="password" element={<Navigate to="/" replace />} />

            <Route path="password" element={<Outlet />}>
              <Route path="reset" element={<Reset />} />
              <Route path="reset/confirm" element={<Confirm />} />
            </Route>

            <Route path="signup" element={<Navigate to="/" replace />} />
            <Route path="signup" element={<SignUp />}>
              <Route path="emailsignup" element={<EmailSignUp />} />
              <Route path="email" element={<Email />} />
              <Route path="emailConfirmation" element={<ConfirmEmail />} />
              <Route path="name" element={<Name />} />
              <Route path="username" element={<Username />} />
            </Route>
          </Route>

          <Route path="p/:postId" element={<Post />}>
            <Route path="c/:commentId" element={<UniqueComment />}>
              <Route path="r/:replyId" />
            </Route>
          </Route>
          <Route path="p/:postId/liked_by" element={<LikedBy />} />
          <Route
            path="p/:postId/comments"
            element={<Comments isWide={false} />}
          >
            <Route path="c/:commentId" element={<UniqueComment />}>
              <Route path="r/:replyId" />
            </Route>
          </Route>
          <Route
            path="p/:postId/c/:commentId/liked_by"
            element={<LikedByComment />}
          />
          <Route
            path="p/:postId/c/:commentId/r/:replyId/liked_by"
            element={<LikedByReplies />}
          />

          {isLoggedIn && (
            <>
              <Route path="/:username/following" element={<Following />} />
              <Route path="/:username/followers" element={<Followers />} />
              <Route
                path="/:username/saved/new_collection"
                element={<NewCollection />}
              />
              <Route
                path="/:username/saved/all-posts/"
                element={<AllPosts />}
              />
              <Route
                path="/:username/saved/:collectionName/:collectionId/"
                element={<Collection />}
              />
              <Route
                path="/:username/saved/:collectionName/:collectionId/add"
                element={<PostSelection type="add" />}
              />
              <Route
                path="/:username/saved/:collectionName/:collectionId/delete"
                element={<PostSelection type="delete" />}
              />
              <Route
                path="/:username/saved/:collectionName/:collectionId/edit"
                element={<EditCollection />}
              />

              <Route path="create" element={<Create />}>
                <Route path="style" element={<Style />} />
                <Route path="details" element={<Details />} />
                <Route path="tag" element={<Tag />} />
                <Route path="location" element={<Location />} />
              </Route>

              <Route path="direct" element={<Navigate to="/" replace />} />
              <Route path="direct" element={<Direct />}>
                <Route path="inbox" element={<Inbox />} />
                <Route path="requests" element={<Inbox isRequests={true} />} />
                <Route path="t/:chatId/" element={<Chat />} />
              </Route>
              <Route path="direct/new/" element={<NewMessage />} />

              <Route path="explore" element={<Explore />}>
                <Route path="/explore" element={<ExplorePosts />} />
                <Route path="search" element={<Search />} />
              </Route>

              <Route path="explore/people" element={<People />} />
              <Route path="explore/tags/:name" element={<Tags />} />
              <Route
                path="explore/locations/:locationId"
                element={<Locations />}
              />

              <Route path="accounts" element={<Navigate to="/" replace />} />
              <Route path="accounts/activity/" element={<Activity />} />
              <Route path="accounts" element={<Accounts />}>
                <Route path="edit" element={<Edit />} />
                <Route
                  path="privacy_and_security"
                  element={<PrivacyAndSecurity />}
                />
                <Route path="password/change" element={<Change />} />
              </Route>
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/:username/saved/new_collection/"
            element={
              <ModalContextDataProvider>
                <Modal type="create-collection" />
              </ModalContextDataProvider>
            }
          />

          <Route
            path="/:username/followers/"
            element={<Modal type="followers" />}
          />
          <Route
            path="/:username/following/"
            element={<Modal type="following" />}
          />
          <Route path="direct/new/" element={<NewMessage />} />
          <Route path="/p/:postId/" element={<Post />} />
        </Routes>
      )}
    </>
  );
}

export default App;
