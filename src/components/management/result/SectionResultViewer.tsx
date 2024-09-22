import { QuestionResult, SectionResult } from '@/services/result/types';
import QuestionResultViewer from './QuestionResultViewer';

export default function SectionResultViewer({ sectionResult }: { sectionResult: SectionResult }) {
  const { title, questionResults } = sectionResult;

  return (
    <div>
      <h2>{title}</h2>
      {questionResults.map((questionResult: QuestionResult) => {
        return <QuestionResultViewer key={questionResult.questionId} questionResult={questionResult} />;
      })}
    </div>
  );
}
