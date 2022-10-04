export interface Question {
	type: QuestionType;
	question: string;
	subject: string;
	tags: string[];
	explaination: string;
}

export interface MultipleChoiceQuestion extends Question {
	answer: MultipleChoiceQuestionChoices;
	choices: {
		A: string;
		B: string;
		C: string;
		D: string;
	}
}

export interface CheckboxQuestion extends Question {
	answers: MultipleChoiceQuestionChoices[];
	choices: {
		A: string;
		B: string;
		C: string;
		D: string;
	}
}

export interface BalancingChemicalEquationsQuestion extends Question {
	answers: number[],
	products: string[],
	reactants: string[],
	reactionType: 'heated' | 'yields' | 'reversible';
}

export interface Choices {
	A: string;
	B: string;
	C: string;
	D: string;
}
export type QuestionType = 'multiple-choice' | 'checkbox' | 'balancing-chemical-equations'; 
export type MultipleChoiceQuestionChoices = 'A' | 'B' | 'C' | 'D';