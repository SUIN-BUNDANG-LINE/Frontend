import { QuestionResult, SectionResult } from '@/services/result/types';
import QuestionChart from './QuestionChart';

export default function SectionResultViewer({ sectionResult }: { sectionResult: SectionResult }) {
  const { title, questionResults } = sectionResult;

  return (
    <div>
      <h2>{title}</h2>
      {questionResults.map((questionResult: QuestionResult) => {
        return <QuestionChart key={questionResult.questionId} questionResult={questionResult} />;
      })}
    </div>
  );
}
