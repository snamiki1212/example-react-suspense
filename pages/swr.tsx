import React from "react";
import useSWR from "swr";
import fetch from "unfetch";
// import ErrorBoundary from "../components/ErrorBoundary"; // ssr非対応なので、ページ単位でバウンダリーを定義。本当は_appとかに置きたい。READEME: https://github.com/zeit/next.js/issues/5070

const fetcher = url => fetch(url).then(r => r.json());

const UserView: React.FC = () => {
  const { data } = useSWR("/api/user", fetcher, { suspense: true });
  return <div>this-is-user: {data.name}</div>;
};

// const UserViewLongLoading: React.FC = () => {
//   const { data } = useSWR("/api/user&waitingTime=2", fetcher, { suspense: true });
//   return <div>this-is-user: {data.name}</div>;
// }

// const Loading: React.FC = () => <span>loading...</span>

const SWR: React.FC = () => {
  // const [viewable, setViewable] = React.useState<boolean>(false);

  return (
    <div>
      {/* <ErrorBoundary> */}
        <h2>Success</h2>
          <React.Suspense fallback={'...loading'}>
            <UserView />
          </React.Suspense>
          <hr />
          {/*  */}
          {/* <h2>Long Fetching</h2>
          <React.Suspense fallback={<Loading />}>
            <UserViewLongLoading />
          </React.Suspense> */}
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default SWR;
