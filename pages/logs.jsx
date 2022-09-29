export default function logs() {
  return <h3>This is logs page</h3>;
}

export async function getServerSideProps(context) {
  const session = false;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
