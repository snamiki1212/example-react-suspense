import React from "react";
import useSWR from "swr";
import fetch from "unfetch";
import ErrorBoundary from "../components/ErrorBoundary"; // ssr非対応なので、ページ単位でバウンダリーを定義。本当は_appとかに置きたい。READEME: https://github.com/zeit/next.js/issues/5070

const fetcher = url => fetch(url).then(r => r.json());

const UserView: React.FC = () => {
  const { data } = useSWR("/api/user", fetcher, { suspense: true });
  return <div>Fetched: user name is {data.name}</div>;
};

const UserViewLongLoading: React.FC = () => {
  const { data } = useSWR("/api/user?waitingSecond=2", fetcher, {
    suspense: true
  });
  return <div>Fetched: user name is {data.name}</div>;
};

const UserViewCond: React.FC<{ shouldFetch: boolean }> = ({ shouldFetch }) => {
  const { data } = useSWR(
    shouldFetch ? "/api/user?waitingSecond=2" : null,
    fetcher,
    {
      suspense: true
    }
  );
  if (data == null) return null;
  return <div>Fetched: user name is {data.name}</div>;
};

const Loading: React.FC = () => <span>...loading...</span>;

const SWR: React.FC = () => {
  const [viewable, setViewable] = React.useState<boolean>(false);
  return (
    <div>
      <ErrorBoundary>
        <div>
          <h2>Success</h2>
          <React.Suspense fallback={<Loading />}>
            <UserView />
          </React.Suspense>
          <hr />
        </div>

        {/*  */}
        <div>
          <h2>Long Fetching: waiting 2 second</h2>
          <React.Suspense fallback={<Loading />}>
            <UserViewLongLoading />
          </React.Suspense>
        </div>

        {/*  */}
        <div>
          <h2>toggle view</h2>
          <button style={{border: '1px black solid' }}onClick={() => setViewable(prev => !prev)}>
            click me after following long-fetching finish.
          </button>
          <p>
            SWR cached data, so this button is clicked and view data imidiately.
          </p>
          <React.Suspense fallback={<Loading />}>
            <UserViewCond shouldFetch={viewable} />
          </React.Suspense>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default SWR;
