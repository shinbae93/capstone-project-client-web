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

export type Assignment = {
  __typename?: 'Assignment';
  /** Example field (placeholder) */
  exampleField: Scalars['ID']['output'];
};

export type Calendar = {
  __typename?: 'Calendar';
  class: Class;
  classId: Scalars['String']['output'];
  className: Scalars['String']['output'];
  course: Course;
  courseId: Scalars['String']['output'];
  courseName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['Date']['output'];
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  method: ClassMethod;
  startTime: Scalars['String']['output'];
  status: CourseStatus;
  tutor?: Maybe<User>;
  tutorId?: Maybe<Scalars['String']['output']>;
  tutorName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type CalendarQueryParams = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ChargeInput = {
  amount: Scalars['Float']['input'];
  paymentMethodId: Scalars['String']['input'];
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

export type ClassFilterParams = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export enum ClassMethod {
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type ClassQueryParams = {
  filters?: InputMaybe<ClassFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

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
  paymentDate?: Maybe<Scalars['Int']['output']>;
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
  gradeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<CourseStatus>>;
  subjectIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  userId?: InputMaybe<Scalars['ID']['input']>;
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

export type CreateAssignmentInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
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
  paymentDate: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  subjectId: Scalars['ID']['input'];
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEnrolmentInput = {
  classId: Scalars['ID']['input'];
};

export type CreateGradeInput = {
  name: Scalars['String']['input'];
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
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
  cv: Scalars['String']['input'];
};

export type CreateTutorReviewInput = {
  comment: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  rating: Scalars['Float']['input'];
  tutorId: Scalars['String']['input'];
};

export type Enrolment = {
  __typename?: 'Enrolment';
  class: Class;
  classId: Scalars['ID']['output'];
  course: Course;
  courseId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isFinished: Scalars['Boolean']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type EnrolmentFilterParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<CourseStatus>>;
};

export type EnrolmentQueryParams = {
  filters?: InputMaybe<EnrolmentFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type EnrolmentsPagination = {
  __typename?: 'EnrolmentsPagination';
  items: Array<Enrolment>;
  meta: PaginationMeta;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Grade = {
  __typename?: 'Grade';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  charge: Payment;
  createAssignment: Assignment;
  createClass: Class;
  createCourse: Course;
  createEnrolment: Enrolment;
  createGrade: Grade;
  createQuiz: Quiz;
  createSubject: Subject;
  createTutorReport: TutorReport;
  createTutorRequest: TutorRequest;
  createTutorReview: TutorReview;
  deleteUser: User;
  login: LoginOutput;
  loginAdmin: LoginOutput;
  logout: Scalars['Boolean']['output'];
  publishCourse: Course;
  refreshToken: Scalars['String']['output'];
  register: User;
  removeAssignment: Assignment;
  removeClass: Scalars['Boolean']['output'];
  removeCourse: Scalars['Boolean']['output'];
  removeEnrolment: Scalars['Boolean']['output'];
  removeGrade: Grade;
  removePayment: Payment;
  removeQuiz: Quiz;
  removeSubject: Scalars['Boolean']['output'];
  removeTutorReport: TutorReport;
  removeTutorRequest: Scalars['Boolean']['output'];
  removeTutorReview: Scalars['Boolean']['output'];
  updateAssignment: Assignment;
  updateClass: Class;
  updateCourse: Course;
  updateGrade: Grade;
  updateQuiz: Quiz;
  updateSubject: Subject;
  updateTutorDetail: TutorDetail;
  updateTutorReport: TutorReport;
  updateTutorRequest: TutorRequest;
  updateTutorRequestStatus: TutorRequest;
  updateTutorReview: TutorReview;
};


export type MutationChargeArgs = {
  chargeInput: ChargeInput;
};


export type MutationCreateAssignmentArgs = {
  createAssignmentInput: CreateAssignmentInput;
};


export type MutationCreateClassArgs = {
  input: CreateClassInput;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateEnrolmentArgs = {
  input: CreateEnrolmentInput;
};


export type MutationCreateGradeArgs = {
  input: CreateGradeInput;
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


export type MutationLoginAdminArgs = {
  input: LoginInput;
};


export type MutationPublishCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveAssignmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveClassArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveGradeArgs = {
  id: Scalars['ID']['input'];
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


export type MutationUpdateAssignmentArgs = {
  updateAssignmentInput: UpdateAssignmentInput;
};


export type MutationUpdateClassArgs = {
  input: UpdateClassInput;
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationUpdateGradeArgs = {
  input: UpdateGradeInput;
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
  /** Default value is 20 */
  limit: Scalars['Int']['input'];
  /** Default value is 1 */
  page: Scalars['Int']['input'];
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
  amount: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPaid: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  paidAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  assignment: Assignment;
  calendar: Calendar;
  calendars: Array<Calendar>;
  classes: Array<Class>;
  course: Course;
  courses: CoursesPagination;
  enrolment: Enrolment;
  enrolments: EnrolmentsPagination;
  getClass: Class;
  getMe: User;
  getUser: User;
  getUsers: Array<User>;
  grade: Grade;
  grades: Array<Grade>;
  isEnrolled: Scalars['Boolean']['output'];
  myCalendars: Array<Calendar>;
  myEnrolments: EnrolmentsPagination;
  payment: Payment;
  payments: Array<Payment>;
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


export type QueryAssignmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCalendarArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCalendarsArgs = {
  queryParams?: InputMaybe<CalendarQueryParams>;
};


export type QueryClassesArgs = {
  queryParams: ClassQueryParams;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  queryParams: CourseQueryParams;
};


export type QueryEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEnrolmentsArgs = {
  queryParams?: InputMaybe<EnrolmentQueryParams>;
};


export type QueryGetClassArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGradeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIsEnrolledArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryMyCalendarsArgs = {
  queryParams?: InputMaybe<CalendarQueryParams>;
};


export type QueryMyEnrolmentsArgs = {
  queryParams?: InputMaybe<EnrolmentQueryParams>;
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
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  gender: Gender;
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
  endTime: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
};

export type ScheduleTimeInput = {
  /** Values from 0 to 6 equivalent to Sunday to Saturday */
  dayOfWeek: Scalars['Float']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
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
  cv: Scalars['String']['output'];
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
  cv: Scalars['String']['output'];
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

export type UpdateAssignmentInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
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
  gradeId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  paymentDate?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  subjectId?: InputMaybe<Scalars['ID']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGradeInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
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
  cv: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateTutorReportInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateTutorRequestInput = {
  cv?: InputMaybe<Scalars['String']['input']>;
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
  birthday: Scalars['Date']['output'];
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

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string } };

export type GetCalendarQueryVariables = Exact<{
  queryParams?: InputMaybe<CalendarQueryParams>;
}>;


export type GetCalendarQuery = { __typename?: 'Query', calendars: Array<{ __typename?: 'Calendar', id: string, courseName: string, className: string, tutorName?: string | null, status: CourseStatus, method: ClassMethod, date: any, startTime: string, endTime: string, courseId: string, classId: string, tutorId?: string | null }> };

export type GetMyCalendarQueryVariables = Exact<{
  queryParams?: InputMaybe<CalendarQueryParams>;
}>;


export type GetMyCalendarQuery = { __typename?: 'Query', myCalendars: Array<{ __typename?: 'Calendar', id: string, courseName: string, className: string, tutorName?: string | null, status: CourseStatus, method: ClassMethod, date: any, startTime: string, endTime: string, courseId: string, classId: string, tutorId?: string | null }> };

export type CreateClassMutationVariables = Exact<{
  input: CreateClassInput;
}>;


export type CreateClassMutation = { __typename?: 'Mutation', createClass: { __typename?: 'Class', id: string } };

export type GetClassQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetClassQuery = { __typename?: 'Query', getClass: { __typename?: 'Class', id: string, name: string, method: ClassMethod, totalSlots: number, schedule: Array<{ __typename?: 'ScheduleTime', dayOfWeek: number, startTime: string, endTime: string }> } };

export type ClassesQueryVariables = Exact<{
  queryParams: ClassQueryParams;
}>;


export type ClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: string, name: string, method: ClassMethod, occupiedSlots: number, totalSlots: number, schedule: Array<{ __typename?: 'ScheduleTime', dayOfWeek: number, startTime: string, endTime: string }> }> };

export type RemoveClassMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveClassMutation = { __typename?: 'Mutation', removeClass: boolean };

export type UpdateClassMutationVariables = Exact<{
  input: UpdateClassInput;
}>;


export type UpdateClassMutation = { __typename?: 'Mutation', updateClass: { __typename?: 'Class', id: string } };

export type CreateCourseMutationVariables = Exact<{
  input: CreateCourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', id: string, name: string, thumbnail?: string | null, description?: string | null, objectives?: Array<string> | null, fee: number, isPublished: boolean, status: CourseStatus, startDate: any, endDate: any, duration: number, userId: string, gradeId: string, subjectId: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, tutorDetail: { __typename?: 'TutorDetail', headline?: string | null, biography?: string | null } }, grade: { __typename?: 'Grade', id: string, name: string }, subject: { __typename?: 'Subject', id: string, name: string }, classes?: Array<{ __typename?: 'Class', id: string, name: string, occupiedSlots: number }> | null } };

export type CourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, thumbnail?: string | null, description?: string | null, objectives?: Array<string> | null, fee: number, isPublished: boolean, status: CourseStatus, paymentDate?: number | null, startDate: any, endDate: any, duration: number, userId: string, gradeId: string, subjectId: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, tutorDetail: { __typename?: 'TutorDetail', headline?: string | null, biography?: string | null } }, grade: { __typename?: 'Grade', id: string, name: string }, subject: { __typename?: 'Subject', id: string, name: string }, classes?: Array<{ __typename?: 'Class', id: string, name: string, method: ClassMethod, totalSlots: number, occupiedSlots: number, schedule: Array<{ __typename?: 'ScheduleTime', dayOfWeek: number, startTime: string, endTime: string }> }> | null } };

export type CoursesQueryVariables = Exact<{
  queryParams: CourseQueryParams;
}>;


export type CoursesQuery = { __typename?: 'Query', courses: { __typename?: 'CoursesPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Course', id: string, name: string, thumbnail?: string | null, description?: string | null, objectives?: Array<string> | null, fee: number, isPublished: boolean, status: CourseStatus, startDate: any, endDate: any, duration: number, userId: string, gradeId: string, subjectId: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, email: string }, classes?: Array<{ __typename?: 'Class', occupiedSlots: number }> | null }> } };

export type PublishCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PublishCourseMutation = { __typename?: 'Mutation', publishCourse: { __typename?: 'Course', id: string } };

export type RemoveCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCourseMutation = { __typename?: 'Mutation', removeCourse: boolean };

export type UpdateCourseMutationVariables = Exact<{
  input: UpdateCourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'Course', id: string } };

export type CreateEnrolmentMutationVariables = Exact<{
  classId: Scalars['ID']['input'];
}>;


export type CreateEnrolmentMutation = { __typename?: 'Mutation', createEnrolment: { __typename?: 'Enrolment', id: string, isFinished: boolean } };

export type GetMyEnrolmentsQueryVariables = Exact<{
  queryParams?: InputMaybe<EnrolmentQueryParams>;
}>;


export type GetMyEnrolmentsQuery = { __typename?: 'Query', myEnrolments: { __typename?: 'EnrolmentsPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Enrolment', id: string, isFinished: boolean, course: { __typename?: 'Course', id: string, name: string, status: CourseStatus, thumbnail?: string | null, fee: number, startDate: any, endDate: any, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, email: string, phoneNumber: string, gender: number, birthday: any } } }> } };

export type StudentEnrolmentsQueryVariables = Exact<{
  queryParams?: InputMaybe<EnrolmentQueryParams>;
}>;


export type StudentEnrolmentsQuery = { __typename?: 'Query', enrolments: { __typename?: 'EnrolmentsPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Enrolment', id: string, isFinished: boolean, createdAt: any, user: { __typename?: 'User', id: string, fullName: string, email: string, avatar?: string | null, gender: number, birthday: any, phoneNumber: string } }> } };

export type IsEnrolledQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type IsEnrolledQuery = { __typename?: 'Query', isEnrolled: boolean };

export type GradesQueryVariables = Exact<{ [key: string]: never; }>;


export type GradesQuery = { __typename?: 'Query', grades: Array<{ __typename?: 'Grade', id: string, name: string }> };

export type SubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubjectsQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', id: string, name: string }> };

export type CreateTutorRequestMutationVariables = Exact<{
  input: CreateTutorRequestInput;
}>;


export type CreateTutorRequestMutation = { __typename?: 'Mutation', createTutorRequest: { __typename?: 'TutorRequest', id: string } };

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
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetCalendarDocument = gql`
    query getCalendar($queryParams: CalendarQueryParams) {
  calendars(queryParams: $queryParams) {
    id
    courseName
    className
    tutorName
    status
    method
    date
    startTime
    endTime
    courseId
    classId
    tutorId
  }
}
    `;

/**
 * __useGetCalendarQuery__
 *
 * To run a query within a React component, call `useGetCalendarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetCalendarQuery(baseOptions?: Apollo.QueryHookOptions<GetCalendarQuery, GetCalendarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCalendarQuery, GetCalendarQueryVariables>(GetCalendarDocument, options);
      }
export function useGetCalendarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarQuery, GetCalendarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCalendarQuery, GetCalendarQueryVariables>(GetCalendarDocument, options);
        }
export type GetCalendarQueryHookResult = ReturnType<typeof useGetCalendarQuery>;
export type GetCalendarLazyQueryHookResult = ReturnType<typeof useGetCalendarLazyQuery>;
export type GetCalendarQueryResult = Apollo.QueryResult<GetCalendarQuery, GetCalendarQueryVariables>;
export const GetMyCalendarDocument = gql`
    query getMyCalendar($queryParams: CalendarQueryParams) {
  myCalendars(queryParams: $queryParams) {
    id
    courseName
    className
    tutorName
    status
    method
    date
    startTime
    endTime
    courseId
    classId
    tutorId
  }
}
    `;

/**
 * __useGetMyCalendarQuery__
 *
 * To run a query within a React component, call `useGetMyCalendarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCalendarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCalendarQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetMyCalendarQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCalendarQuery, GetMyCalendarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyCalendarQuery, GetMyCalendarQueryVariables>(GetMyCalendarDocument, options);
      }
export function useGetMyCalendarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCalendarQuery, GetMyCalendarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyCalendarQuery, GetMyCalendarQueryVariables>(GetMyCalendarDocument, options);
        }
export type GetMyCalendarQueryHookResult = ReturnType<typeof useGetMyCalendarQuery>;
export type GetMyCalendarLazyQueryHookResult = ReturnType<typeof useGetMyCalendarLazyQuery>;
export type GetMyCalendarQueryResult = Apollo.QueryResult<GetMyCalendarQuery, GetMyCalendarQueryVariables>;
export const CreateClassDocument = gql`
    mutation createClass($input: CreateClassInput!) {
  createClass(input: $input) {
    id
  }
}
    `;
export type CreateClassMutationFn = Apollo.MutationFunction<CreateClassMutation, CreateClassMutationVariables>;

/**
 * __useCreateClassMutation__
 *
 * To run a mutation, you first call `useCreateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClassMutation, { data, loading, error }] = useCreateClassMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClassMutation(baseOptions?: Apollo.MutationHookOptions<CreateClassMutation, CreateClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClassMutation, CreateClassMutationVariables>(CreateClassDocument, options);
      }
export type CreateClassMutationHookResult = ReturnType<typeof useCreateClassMutation>;
export type CreateClassMutationResult = Apollo.MutationResult<CreateClassMutation>;
export type CreateClassMutationOptions = Apollo.BaseMutationOptions<CreateClassMutation, CreateClassMutationVariables>;
export const GetClassDocument = gql`
    query getClass($id: ID!) {
  getClass(id: $id) {
    id
    name
    method
    schedule {
      dayOfWeek
      startTime
      endTime
    }
    totalSlots
  }
}
    `;

/**
 * __useGetClassQuery__
 *
 * To run a query within a React component, call `useGetClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClassQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClassQuery(baseOptions: Apollo.QueryHookOptions<GetClassQuery, GetClassQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClassQuery, GetClassQueryVariables>(GetClassDocument, options);
      }
export function useGetClassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClassQuery, GetClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClassQuery, GetClassQueryVariables>(GetClassDocument, options);
        }
export type GetClassQueryHookResult = ReturnType<typeof useGetClassQuery>;
export type GetClassLazyQueryHookResult = ReturnType<typeof useGetClassLazyQuery>;
export type GetClassQueryResult = Apollo.QueryResult<GetClassQuery, GetClassQueryVariables>;
export const ClassesDocument = gql`
    query classes($queryParams: ClassQueryParams!) {
  classes(queryParams: $queryParams) {
    id
    name
    method
    schedule {
      dayOfWeek
      startTime
      endTime
    }
    occupiedSlots
    totalSlots
  }
}
    `;

/**
 * __useClassesQuery__
 *
 * To run a query within a React component, call `useClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassesQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useClassesQuery(baseOptions: Apollo.QueryHookOptions<ClassesQuery, ClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClassesQuery, ClassesQueryVariables>(ClassesDocument, options);
      }
export function useClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassesQuery, ClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClassesQuery, ClassesQueryVariables>(ClassesDocument, options);
        }
export type ClassesQueryHookResult = ReturnType<typeof useClassesQuery>;
export type ClassesLazyQueryHookResult = ReturnType<typeof useClassesLazyQuery>;
export type ClassesQueryResult = Apollo.QueryResult<ClassesQuery, ClassesQueryVariables>;
export const RemoveClassDocument = gql`
    mutation removeClass($id: ID!) {
  removeClass(id: $id)
}
    `;
export type RemoveClassMutationFn = Apollo.MutationFunction<RemoveClassMutation, RemoveClassMutationVariables>;

/**
 * __useRemoveClassMutation__
 *
 * To run a mutation, you first call `useRemoveClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClassMutation, { data, loading, error }] = useRemoveClassMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveClassMutation(baseOptions?: Apollo.MutationHookOptions<RemoveClassMutation, RemoveClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveClassMutation, RemoveClassMutationVariables>(RemoveClassDocument, options);
      }
export type RemoveClassMutationHookResult = ReturnType<typeof useRemoveClassMutation>;
export type RemoveClassMutationResult = Apollo.MutationResult<RemoveClassMutation>;
export type RemoveClassMutationOptions = Apollo.BaseMutationOptions<RemoveClassMutation, RemoveClassMutationVariables>;
export const UpdateClassDocument = gql`
    mutation updateClass($input: UpdateClassInput!) {
  updateClass(input: $input) {
    id
  }
}
    `;
export type UpdateClassMutationFn = Apollo.MutationFunction<UpdateClassMutation, UpdateClassMutationVariables>;

/**
 * __useUpdateClassMutation__
 *
 * To run a mutation, you first call `useUpdateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClassMutation, { data, loading, error }] = useUpdateClassMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClassMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClassMutation, UpdateClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClassMutation, UpdateClassMutationVariables>(UpdateClassDocument, options);
      }
export type UpdateClassMutationHookResult = ReturnType<typeof useUpdateClassMutation>;
export type UpdateClassMutationResult = Apollo.MutationResult<UpdateClassMutation>;
export type UpdateClassMutationOptions = Apollo.BaseMutationOptions<UpdateClassMutation, UpdateClassMutationVariables>;
export const CreateCourseDocument = gql`
    mutation createCourse($input: CreateCourseInput!) {
  createCourse(input: $input) {
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
    gradeId
    grade {
      id
      name
    }
    subjectId
    subject {
      id
      name
    }
    classes {
      id
      name
      occupiedSlots
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
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
    paymentDate
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
    gradeId
    grade {
      id
      name
    }
    subjectId
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
        startTime
        endTime
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
      classes {
        occupiedSlots
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
export const PublishCourseDocument = gql`
    mutation publishCourse($id: ID!) {
  publishCourse(id: $id) {
    id
  }
}
    `;
export type PublishCourseMutationFn = Apollo.MutationFunction<PublishCourseMutation, PublishCourseMutationVariables>;

/**
 * __usePublishCourseMutation__
 *
 * To run a mutation, you first call `usePublishCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishCourseMutation, { data, loading, error }] = usePublishCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishCourseMutation(baseOptions?: Apollo.MutationHookOptions<PublishCourseMutation, PublishCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishCourseMutation, PublishCourseMutationVariables>(PublishCourseDocument, options);
      }
export type PublishCourseMutationHookResult = ReturnType<typeof usePublishCourseMutation>;
export type PublishCourseMutationResult = Apollo.MutationResult<PublishCourseMutation>;
export type PublishCourseMutationOptions = Apollo.BaseMutationOptions<PublishCourseMutation, PublishCourseMutationVariables>;
export const RemoveCourseDocument = gql`
    mutation removeCourse($id: ID!) {
  removeCourse(id: $id)
}
    `;
export type RemoveCourseMutationFn = Apollo.MutationFunction<RemoveCourseMutation, RemoveCourseMutationVariables>;

/**
 * __useRemoveCourseMutation__
 *
 * To run a mutation, you first call `useRemoveCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseMutation, { data, loading, error }] = useRemoveCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCourseMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCourseMutation, RemoveCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCourseMutation, RemoveCourseMutationVariables>(RemoveCourseDocument, options);
      }
export type RemoveCourseMutationHookResult = ReturnType<typeof useRemoveCourseMutation>;
export type RemoveCourseMutationResult = Apollo.MutationResult<RemoveCourseMutation>;
export type RemoveCourseMutationOptions = Apollo.BaseMutationOptions<RemoveCourseMutation, RemoveCourseMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation updateCourse($input: UpdateCourseInput!) {
  updateCourse(input: $input) {
    id
  }
}
    `;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
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
export const GetMyEnrolmentsDocument = gql`
    query getMyEnrolments($queryParams: EnrolmentQueryParams) {
  myEnrolments(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      isFinished
      course {
        id
        name
        status
        thumbnail
        fee
        startDate
        endDate
        user {
          id
          avatar
          fullName
          email
          phoneNumber
          gender
          birthday
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyEnrolmentsQuery__
 *
 * To run a query within a React component, call `useGetMyEnrolmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEnrolmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEnrolmentsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetMyEnrolmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyEnrolmentsQuery, GetMyEnrolmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyEnrolmentsQuery, GetMyEnrolmentsQueryVariables>(GetMyEnrolmentsDocument, options);
      }
export function useGetMyEnrolmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyEnrolmentsQuery, GetMyEnrolmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyEnrolmentsQuery, GetMyEnrolmentsQueryVariables>(GetMyEnrolmentsDocument, options);
        }
export type GetMyEnrolmentsQueryHookResult = ReturnType<typeof useGetMyEnrolmentsQuery>;
export type GetMyEnrolmentsLazyQueryHookResult = ReturnType<typeof useGetMyEnrolmentsLazyQuery>;
export type GetMyEnrolmentsQueryResult = Apollo.QueryResult<GetMyEnrolmentsQuery, GetMyEnrolmentsQueryVariables>;
export const StudentEnrolmentsDocument = gql`
    query studentEnrolments($queryParams: EnrolmentQueryParams) {
  enrolments(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      isFinished
      createdAt
      user {
        id
        fullName
        email
        avatar
        gender
        birthday
        phoneNumber
      }
    }
  }
}
    `;

/**
 * __useStudentEnrolmentsQuery__
 *
 * To run a query within a React component, call `useStudentEnrolmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentEnrolmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentEnrolmentsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useStudentEnrolmentsQuery(baseOptions?: Apollo.QueryHookOptions<StudentEnrolmentsQuery, StudentEnrolmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentEnrolmentsQuery, StudentEnrolmentsQueryVariables>(StudentEnrolmentsDocument, options);
      }
export function useStudentEnrolmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentEnrolmentsQuery, StudentEnrolmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentEnrolmentsQuery, StudentEnrolmentsQueryVariables>(StudentEnrolmentsDocument, options);
        }
export type StudentEnrolmentsQueryHookResult = ReturnType<typeof useStudentEnrolmentsQuery>;
export type StudentEnrolmentsLazyQueryHookResult = ReturnType<typeof useStudentEnrolmentsLazyQuery>;
export type StudentEnrolmentsQueryResult = Apollo.QueryResult<StudentEnrolmentsQuery, StudentEnrolmentsQueryVariables>;
export const IsEnrolledDocument = gql`
    query isEnrolled($courseId: ID!) {
  isEnrolled(courseId: $courseId)
}
    `;

/**
 * __useIsEnrolledQuery__
 *
 * To run a query within a React component, call `useIsEnrolledQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsEnrolledQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsEnrolledQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useIsEnrolledQuery(baseOptions: Apollo.QueryHookOptions<IsEnrolledQuery, IsEnrolledQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsEnrolledQuery, IsEnrolledQueryVariables>(IsEnrolledDocument, options);
      }
export function useIsEnrolledLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsEnrolledQuery, IsEnrolledQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsEnrolledQuery, IsEnrolledQueryVariables>(IsEnrolledDocument, options);
        }
export type IsEnrolledQueryHookResult = ReturnType<typeof useIsEnrolledQuery>;
export type IsEnrolledLazyQueryHookResult = ReturnType<typeof useIsEnrolledLazyQuery>;
export type IsEnrolledQueryResult = Apollo.QueryResult<IsEnrolledQuery, IsEnrolledQueryVariables>;
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
export const CreateTutorRequestDocument = gql`
    mutation createTutorRequest($input: CreateTutorRequestInput!) {
  createTutorRequest(input: $input) {
    id
  }
}
    `;
export type CreateTutorRequestMutationFn = Apollo.MutationFunction<CreateTutorRequestMutation, CreateTutorRequestMutationVariables>;

/**
 * __useCreateTutorRequestMutation__
 *
 * To run a mutation, you first call `useCreateTutorRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTutorRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTutorRequestMutation, { data, loading, error }] = useCreateTutorRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTutorRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateTutorRequestMutation, CreateTutorRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTutorRequestMutation, CreateTutorRequestMutationVariables>(CreateTutorRequestDocument, options);
      }
export type CreateTutorRequestMutationHookResult = ReturnType<typeof useCreateTutorRequestMutation>;
export type CreateTutorRequestMutationResult = Apollo.MutationResult<CreateTutorRequestMutation>;
export type CreateTutorRequestMutationOptions = Apollo.BaseMutationOptions<CreateTutorRequestMutation, CreateTutorRequestMutationVariables>;
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