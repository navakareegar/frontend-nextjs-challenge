import DetailsWrapper from '@/components/pages/user/DetailsWrapper';

interface IPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: IPageProps) {
  const { params } = props;
  const { id } = await params;

  return <DetailsWrapper userId={id} />;
}
