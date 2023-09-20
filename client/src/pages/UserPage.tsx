import { Post } from '@/features/posts/Post/Post.tsx';
import { UserHeader } from '@/features/user/UserHeader/UserHeader.tsx';

export function UserPage() {
  return (
    <>
      <UserHeader />
      <Post
        likes={1200}
        replies={234}
        postImg="/post1.webp"
        postText="I ate a sock because people on the Internet told me to."
      />
      <Post likes={1} replies={0} postText="hello there" />
      <Post
        likes={234}
        replies={21}
        postImg="/post2.webp"
        postText="She insisted that cleaning out your closet was the key to good driving"
      />
      <Post
        likes={244}
        replies={224}
        postText="This is as good as the zebra who was purple but it got eaten by the orange spoon that was more of a purpler orange than a triangle."
      />
      <Post
        likes={43}
        replies={24}
        postImg="/post3.webp"
        postText="The furnace repairman indicated the heating system was acting as an air conditioner."
      />
    </>
  );
}
