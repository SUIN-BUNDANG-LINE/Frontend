import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button/Button';
import { fetchCreate } from '@/components/workbench/service/fetch';

export default function SurveyCreateButton() {
  const nextRouter = useRouter();

  async function createNewSurvey() {
    const data = await fetchCreate();
    nextRouter.push(`/workbench/${data.surveyId}`);
  }

  return (
    <Button variant="primary" height="35px" onClick={() => createNewSurvey}>
      <span style={{ color: '#fff' }}>새로운 설문 만들기 →</span>
    </Button>
  );
}
