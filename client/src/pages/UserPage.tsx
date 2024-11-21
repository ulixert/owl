import { PostItem } from '@/features/posts/PostItem/PostItem.tsx';
import { UserHeader } from '@/features/user/UserHeader/UserHeader.tsx';

function UserPage() {
  return (
    <>
      <UserHeader />
      <PostItem
        likes={1200}
        replies={234}
        postImages="/post1.webp"
        postText="I ate a sock because people on the Internet told me to."
      />
      <PostItem likes={1} replies={0} postText="hello there" />
      <PostItem
        likes={234}
        replies={21}
        postImages="/post2.webp"
        postText="She insisted that cleaning out your closet was the key to good driving"
      />
      <PostItem
        likes={244}
        replies={224}
        postText="This is as good as the zebra who was purple but it got eaten by the orange spoon that was more of a purpler orange than a triangle."
      />
      <PostItem
        likes={43}
        replies={24}
        postImages="/post3.webp"
        postText="The furnace repairman indicated the heating system was acting as an air conditioner."
      />
    </>
  );
}

export default UserPage;
