import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button/Button';
import { useCreateSurvey } from '@/components/workbench/service/index';
import type { ErrorCause } from '@/services/ky-wrapper';
import { showToast } from '@/utils/toast';

export default function SurveyCreateButton() {
  const nextRouter = useRouter();
  const mutation = useCreateSurvey();

  async function createNewSurvey() {
    mutation.mutate(undefined, {
      onSuccess: (data) => {
        nextRouter.push(`/workbench/${data.surveyId}`);
      },
      onError: (error) => {
        showToast('error', (error.cause as ErrorCause).message);
      },
    });
  }

  return (
    <Button variant="primary" height="35px" onClick={() => createNewSurvey()}>
      <span style={{ color: '#fff' }}>새로운 설문 만들기 →</span>
    </Button>
  );
}
