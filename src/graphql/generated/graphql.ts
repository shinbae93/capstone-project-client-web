import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Class = {
  __typename?: 'Class';
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  method: ClassMethod;
  name: Scalars['String']['output'];
  occupiedSlots: Scalars['Float']['output'];
  schedule: Array<ScheduleTime>;
  totalSlots: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum ClassMethod {
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type Course = {
  __typename?: 'Course';
  classes?: Maybe<Array<Class>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Float']['output'];
  endDate: Scalars['Date']['output'];
  fee: Scalars['Float']['output'];
  grade: Grade;
  gradeId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublished: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  objectives?: Maybe<Array<Scalars['String']['output']>>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  startDate: Scalars['Date']['output'];
  status: CourseStatus;
  subject: Subject;
  subjectId: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type CourseFilterParams = {
  gradeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  q?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<CourseStatus>>;
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CourseQueryParams = {
  filters?: InputMaybe<CourseFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export enum CourseStatus {
  Ended = 'ENDED',
  InProgress = 'IN_PROGRESS',
  UpComing = 'UP_COMING'
}

export type CoursesPagination = {
  __typename?: 'CoursesPagination';
  items: Array<Course>;
  meta: PaginationMeta;
};

export type CreateClassInput = {
  courseId: Scalars['String']['input'];
  method: ClassMethod;
  name: Scalars['String']['input'];
  schedule: Array<ScheduleTimeInput>;
  totalSlots: Scalars['Int']['input'];
};

export type CreateCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  fee: Scalars['Float']['input'];
  gradeId: Scalars['ID']['input'];
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate: Scalars['DateTime']['input'];
  subjectId: Scalars['ID']['input'];
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDocumentInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateEnrolmentInput = {
  classId: Scalars['ID']['input'];
};

export type CreateGradeInput = {
  name: Scalars['String']['input'];
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateLessonCommentInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateLessonInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreatePaymentInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateQuizInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateSubjectInput = {
  gradeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
};

export type CreateTutorReportInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateTutorRequestInput = {
  cvImage: Scalars['String']['input'];
};

export type CreateTutorReviewInput = {
  comment: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  rating: Scalars['Float']['input'];
  tutorId: Scalars['String']['input'];
};

export type Document = {
  __typename?: 'Document';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type Enrolment = {
  __typename?: 'Enrolment';
  class: Class;
  classId: Scalars['ID']['output'];
  course: Course;
  courseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  isFinished: Scalars['Boolean']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type Grade = {
  __typename?: 'Grade';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Lesson = {
  __typename?: 'Lesson';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type LessonComment = {
  __typename?: 'LessonComment';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type LessonTime = {
  __typename?: 'LessonTime';
  /** Values from 0 to 23 */
  hour: Scalars['Float']['output'];
  /** Values from 0 to 59 */
  minute: Scalars['Float']['output'];
};

export type LessonTimeInput = {
  /** Values from 0 to 23 */
  hour: Scalars['Float']['input'];
  /** Values from 0 to 59 */
  minute: Scalars['Float']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClass: Class;
  createCourse: Course;
  createDocument: Document;
  createEnrolment: Enrolment;
  createGrade: Grade;
  createLesson: Lesson;
  createLessonComment: LessonComment;
  createPayment: Payment;
  createQuiz: Quiz;
  createSubject: Subject;
  createTutorReport: TutorReport;
  createTutorRequest: TutorRequest;
  createTutorReview: TutorReview;
  deleteUser: User;
  login: LoginOutput;
  logout: Scalars['Boolean']['output'];
  refreshToken: Scalars['String']['output'];
  register: User;
  removeClass: Scalars['Boolean']['output'];
  removeCourse: Course;
  removeDocument: Document;
  removeEnrolment: Scalars['Boolean']['output'];
  removeGrade: Grade;
  removeLesson: Lesson;
  removeLessonComment: LessonComment;
  removePayment: Payment;
  removeQuiz: Quiz;
  removeSubject: Scalars['Boolean']['output'];
  removeTutorReport: TutorReport;
  removeTutorRequest: Scalars['Boolean']['output'];
  removeTutorReview: Scalars['Boolean']['output'];
  updateClass: Class;
  updateCourse: Course;
  updateCourseStatus: Course;
  updateDocument: Document;
  updateGrade: Grade;
  updateLesson: Lesson;
  updateLessonComment: LessonComment;
  updatePayment: Payment;
  updateQuiz: Quiz;
  updateSubject: Subject;
  updateTutorDetail: TutorDetail;
  updateTutorReport: TutorReport;
  updateTutorRequest: TutorRequest;
  updateTutorRequestStatus: TutorRequest;
  updateTutorReview: TutorReview;
};


export type MutationCreateClassArgs = {
  input: CreateClassInput;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateDocumentArgs = {
  createDocumentInput: CreateDocumentInput;
};


export type MutationCreateEnrolmentArgs = {
  input: CreateEnrolmentInput;
};


export type MutationCreateGradeArgs = {
  input: CreateGradeInput;
};


export type MutationCreateLessonArgs = {
  createLessonInput: CreateLessonInput;
};


export type MutationCreateLessonCommentArgs = {
  createLessonCommentInput: CreateLessonCommentInput;
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreateQuizArgs = {
  createQuizInput: CreateQuizInput;
};


export type MutationCreateSubjectArgs = {
  input: CreateSubjectInput;
};


export type MutationCreateTutorReportArgs = {
  createTutorReportInput: CreateTutorReportInput;
};


export type MutationCreateTutorRequestArgs = {
  input: CreateTutorRequestInput;
};


export type MutationCreateTutorReviewArgs = {
  input: CreateTutorReviewInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveClassArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveGradeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveLessonArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveLessonCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePaymentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveQuizArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSubjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTutorReportArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTutorRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTutorReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateClassArgs = {
  input: UpdateClassInput;
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationUpdateCourseStatusArgs = {
  input: UpdateCourseStatusInput;
};


export type MutationUpdateDocumentArgs = {
  updateDocumentInput: UpdateDocumentInput;
};


export type MutationUpdateGradeArgs = {
  input: UpdateGradeInput;
};


export type MutationUpdateLessonArgs = {
  updateLessonInput: UpdateLessonInput;
};


export type MutationUpdateLessonCommentArgs = {
  updateLessonCommentInput: UpdateLessonCommentInput;
};


export type MutationUpdatePaymentArgs = {
  updatePaymentInput: UpdatePaymentInput;
};


export type MutationUpdateQuizArgs = {
  updateQuizInput: UpdateQuizInput;
};


export type MutationUpdateSubjectArgs = {
  input: UpdateSubjectInput;
};


export type MutationUpdateTutorDetailArgs = {
  input: UpdateTutorDetailInput;
};


export type MutationUpdateTutorReportArgs = {
  updateTutorReportInput: UpdateTutorReportInput;
};


export type MutationUpdateTutorRequestArgs = {
  input: UpdateTutorRequestInput;
};


export type MutationUpdateTutorRequestStatusArgs = {
  input: UpdateTutorRequestStatusInput;
};


export type MutationUpdateTutorReviewArgs = {
  input: UpdateTutorReviewInput;
};

export type PaginateOptions = {
  limit: Scalars['Float']['input'];
  page: Scalars['Float']['input'];
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  currentPage: Scalars['Float']['output'];
  itemCount: Scalars['Float']['output'];
  itemsPerPage: Scalars['Float']['output'];
  totalItems: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  class: Class;
  classes: Array<Class>;
  course: Course;
  courses: CoursesPagination;
  document: Document;
  enrolment: Enrolment;
  enrolments: Array<Enrolment>;
  getMe: User;
  getUser: User;
  getUsers: Array<User>;
  grade: Grade;
  grades: Array<Grade>;
  lesson: Lesson;
  lessonComment: LessonComment;
  payment: Payment;
  quiz: Quiz;
  subject: Subject;
  subjects: Array<Subject>;
  tutorDetail: TutorDetail;
  tutorReport: TutorReport;
  tutorRequest: TutorRequest;
  tutorRequests: Array<TutorRequest>;
  tutorReview: TutorReview;
  tutorReviews: Array<TutorReview>;
};


export type QueryClassArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClassesArgs = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  queryParams: CourseQueryParams;
};


export type QueryDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGradeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLessonArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLessonCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryQuizArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorReportArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTutorRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorReviewArgs = {
  id: Scalars['ID']['input'];
};

export type Quiz = {
  __typename?: 'Quiz';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type RegisterInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  gender: Scalars['Float']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ScheduleTime = {
  __typename?: 'ScheduleTime';
  /** Values from 0 to 6 equivalent to Sunday to Saturday */
  dayOfWeek: Scalars['Float']['output'];
  endTime: LessonTime;
  startTime: LessonTime;
};

export type ScheduleTimeInput = {
  /** Values from 0 to 6 equivalent to Sunday to Saturday */
  dayOfWeek: Scalars['Float']['input'];
  endTime: LessonTimeInput;
  startTime: LessonTimeInput;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortField = {
  direction: SortDirection;
  field: Scalars['String']['input'];
  nulls?: InputMaybe<SortNullDirection>;
};

export enum SortNullDirection {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type Subject = {
  __typename?: 'Subject';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TutorDetail = {
  __typename?: 'TutorDetail';
  biography?: Maybe<Scalars['String']['output']>;
  cvImage: Scalars['String']['output'];
  headline?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type TutorReport = {
  __typename?: 'TutorReport';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type TutorRequest = {
  __typename?: 'TutorRequest';
  createdAt: Scalars['DateTime']['output'];
  cvImage: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: TutorRequestStatus;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export enum TutorRequestStatus {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED'
}

export type TutorReview = {
  __typename?: 'TutorReview';
  author: User;
  authorId: Scalars['String']['output'];
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  rating: Scalars['Float']['output'];
  tutor: User;
  tutorId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateClassInput = {
  id: Scalars['ID']['input'];
  method?: InputMaybe<ClassMethod>;
  name?: InputMaybe<Scalars['String']['input']>;
  schedule?: InputMaybe<Array<ScheduleTimeInput>>;
  totalSlots?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  fee?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseStatusInput = {
  id: Scalars['ID']['input'];
  status: CourseStatus;
};

export type UpdateDocumentInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateGradeInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateLessonCommentInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateLessonInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdatePaymentInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateQuizInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateSubjectInput = {
  gradeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTutorDetailInput = {
  cvImage: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateTutorReportInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateTutorRequestInput = {
  cvImage?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateTutorRequestStatusInput = {
  id: Scalars['ID']['input'];
  status: TutorRequestStatus;
};

export type UpdateTutorReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  rating?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  birthday: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gender: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  phoneNumber: Scalars['String']['output'];
  role: Role;
  roleId: Scalars['String']['output'];
  tutorDetail: TutorDetail;
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', accessToken: string, refreshToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: string };

export type CourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, thumbnail?: string | null, description?: string | null, objectives?: Array<string> | null, fee: number, isPublished: boolean, status: CourseStatus, startDate: any, endDate: any, duration: number, userId: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, tutorDetail: { __typename?: 'TutorDetail', headline?: string | null, biography?: string | null } }, grade: { __typename?: 'Grade', id: string, name: string }, subject: { __typename?: 'Subject', id: string, name: string }, classes?: Array<{ __typename?: 'Class', id: string, name: string, method: ClassMethod, totalSlots: number, occupiedSlots: number, schedule: Array<{ __typename?: 'ScheduleTime', dayOfWeek: number, startTime: { __typename?: 'LessonTime', hour: number, minute: number }, endTime: { __typename?: 'LessonTime', hour: number, minute: number } }> }> | null } };

export type CoursesQueryVariables = Exact<{
  queryParams: CourseQueryParams;
}>;


export type CoursesQuery = { __typename?: 'Query', courses: { __typename?: 'CoursesPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Course', id: string, name: string, thumbnail?: string | null, description?: string | null, objectives?: Array<string> | null, fee: number, isPublished: boolean, status: CourseStatus, startDate: any, endDate: any, duration: number, userId: string, gradeId: string, subjectId: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, email: string } }> } };

export type CreateEnrolmentMutationVariables = Exact<{
  classId: Scalars['ID']['input'];
}>;


export type CreateEnrolmentMutation = { __typename?: 'Mutation', createEnrolment: { __typename?: 'Enrolment', id: string, isFinished: boolean } };

export type GradesQueryVariables = Exact<{ [key: string]: never; }>;


export type GradesQuery = { __typename?: 'Query', grades: Array<{ __typename?: 'Grade', id: string, name: string }> };

export type SubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubjectsQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', id: string, name: string }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'User', id: string, email: string, fullName: string, avatar?: string | null, phoneNumber: string, gender: number, birthday: any, roleId: string, createdAt: any, updatedAt: any, role: { __typename?: 'Role', name: string } } };


export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($token: String!) {
  refreshToken(token: $token)
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CourseDocument = gql`
    query course($id: ID!) {
  course(id: $id) {
    id
    name
    thumbnail
    description
    objectives
    fee
    isPublished
    status
    startDate
    endDate
    duration
    userId
    user {
      id
      avatar
      fullName
      tutorDetail {
        headline
        biography
      }
    }
    grade {
      id
      name
    }
    subject {
      id
      name
    }
    classes {
      id
      name
      method
      schedule {
        dayOfWeek
        startTime {
          hour
          minute
        }
        endTime {
          hour
          minute
        }
      }
      totalSlots
      occupiedSlots
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const CoursesDocument = gql`
    query courses($queryParams: CourseQueryParams!) {
  courses(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      name
      thumbnail
      description
      objectives
      fee
      isPublished
      status
      startDate
      endDate
      duration
      userId
      user {
        id
        avatar
        fullName
        email
      }
      gradeId
      subjectId
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useCoursesQuery(baseOptions: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const CreateEnrolmentDocument = gql`
    mutation createEnrolment($classId: ID!) {
  createEnrolment(input: {classId: $classId}) {
    id
    isFinished
  }
}
    `;
export type CreateEnrolmentMutationFn = Apollo.MutationFunction<CreateEnrolmentMutation, CreateEnrolmentMutationVariables>;

/**
 * __useCreateEnrolmentMutation__
 *
 * To run a mutation, you first call `useCreateEnrolmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEnrolmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEnrolmentMutation, { data, loading, error }] = useCreateEnrolmentMutation({
 *   variables: {
 *      classId: // value for 'classId'
 *   },
 * });
 */
export function useCreateEnrolmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateEnrolmentMutation, CreateEnrolmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEnrolmentMutation, CreateEnrolmentMutationVariables>(CreateEnrolmentDocument, options);
      }
export type CreateEnrolmentMutationHookResult = ReturnType<typeof useCreateEnrolmentMutation>;
export type CreateEnrolmentMutationResult = Apollo.MutationResult<CreateEnrolmentMutation>;
export type CreateEnrolmentMutationOptions = Apollo.BaseMutationOptions<CreateEnrolmentMutation, CreateEnrolmentMutationVariables>;
export const GradesDocument = gql`
    query grades {
  grades {
    id
    name
  }
}
    `;

/**
 * __useGradesQuery__
 *
 * To run a query within a React component, call `useGradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGradesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGradesQuery(baseOptions?: Apollo.QueryHookOptions<GradesQuery, GradesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GradesQuery, GradesQueryVariables>(GradesDocument, options);
      }
export function useGradesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GradesQuery, GradesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GradesQuery, GradesQueryVariables>(GradesDocument, options);
        }
export type GradesQueryHookResult = ReturnType<typeof useGradesQuery>;
export type GradesLazyQueryHookResult = ReturnType<typeof useGradesLazyQuery>;
export type GradesQueryResult = Apollo.QueryResult<GradesQuery, GradesQueryVariables>;
export const SubjectsDocument = gql`
    query subjects {
  subjects {
    id
    name
  }
}
    `;

/**
 * __useSubjectsQuery__
 *
 * To run a query within a React component, call `useSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<SubjectsQuery, SubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, options);
      }
export function useSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectsQuery, SubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, options);
        }
export type SubjectsQueryHookResult = ReturnType<typeof useSubjectsQuery>;
export type SubjectsLazyQueryHookResult = ReturnType<typeof useSubjectsLazyQuery>;
export type SubjectsQueryResult = Apollo.QueryResult<SubjectsQuery, SubjectsQueryVariables>;
export const GetMeDocument = gql`
    query getMe {
  getMe {
    id
    email
    fullName
    avatar
    phoneNumber
    gender
    birthday
    roleId
    role {
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;