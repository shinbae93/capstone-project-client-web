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
  class: Class;
  classId: Scalars['String']['output'];
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  feedback?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  quiz: Quiz;
  quizId: Scalars['String']['output'];
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type AssignmentFilterParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  quizId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type AssignmentPagination = {
  __typename?: 'AssignmentPagination';
  items: Array<Assignment>;
  meta: PaginationMeta;
};

export type AssignmentQueryParams = {
  filters?: InputMaybe<AssignmentFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type Calendar = {
  __typename?: 'Calendar';
  class?: Maybe<Class>;
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
  classId: Scalars['String']['input'];
  paymentMethodId: Scalars['String']['input'];
};

export type Class = {
  __typename?: 'Class';
  address?: Maybe<Scalars['String']['output']>;
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Float']['output'];
  endDate: Scalars['Date']['output'];
  fee: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  method: ClassMethod;
  name: Scalars['String']['output'];
  occupiedSlots: Scalars['Float']['output'];
  schedule: Array<ScheduleTime>;
  startDate: Scalars['Date']['output'];
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
  grade: Grade;
  gradeId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublished: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  objectives?: Maybe<Array<Scalars['String']['output']>>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
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
  Draft = 'DRAFT',
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
  address?: InputMaybe<Scalars['String']['input']>;
  courseId: Scalars['String']['input'];
  endDate: Scalars['DateTime']['input'];
  fee: Scalars['Float']['input'];
  method: ClassMethod;
  name: Scalars['String']['input'];
  schedule: Array<ScheduleTimeInput>;
  startDate: Scalars['DateTime']['input'];
  totalSlots: Scalars['Int']['input'];
};

export type CreateCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  gradeId: Scalars['ID']['input'];
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  subjectId: Scalars['ID']['input'];
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEnrolmentInput = {
  classId: Scalars['ID']['input'];
  totalMonths: Scalars['Int']['input'];
};

export type CreateGradeInput = {
  name: Scalars['String']['input'];
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateQuizInput = {
  classId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  courseId: Scalars['ID']['input'];
  endTime: Scalars['DateTime']['input'];
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  startTime: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateSubjectInput = {
  gradeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
};

export type CreateTutorReportInput = {
  classId: Scalars['String']['input'];
  courseId: Scalars['String']['input'];
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  reason: Scalars['String']['input'];
  tutorId: Scalars['String']['input'];
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
  endTime: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  overduePaymentAt: Scalars['Date']['output'];
  payment?: Maybe<Payment>;
  paymentId?: Maybe<Scalars['ID']['output']>;
  startTime: Scalars['Date']['output'];
  status: EnrolmentStatus;
  user: User;
  userId: Scalars['ID']['output'];
};

export type EnrolmentFilterParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<EnrolmentStatus>>;
};

export type EnrolmentQueryParams = {
  filters?: InputMaybe<EnrolmentFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export enum EnrolmentStatus {
  Ended = 'ENDED',
  InProgress = 'IN_PROGRESS',
  OverduePayment = 'OVERDUE_PAYMENT',
  PendingPayment = 'PENDING_PAYMENT',
  UpComing = 'UP_COMING'
}

export type EnrolmentsPagination = {
  __typename?: 'EnrolmentsPagination';
  items: Array<Enrolment>;
  meta: PaginationMeta;
};

export type FeedbackAssignmentInput = {
  feedback: Scalars['String']['input'];
  id: Scalars['ID']['input'];
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

export type GradePagination = {
  __typename?: 'GradePagination';
  items: Array<Grade>;
  meta: PaginationMeta;
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
  createClass: Class;
  createCourse: Course;
  createEnrolment: Enrolment;
  createGrade: Grade;
  createQuiz: Quiz;
  createSubject: Subject;
  createTutorReport: TutorReport;
  createTutorRequest: TutorRequest;
  createTutorReview: TutorReview;
  deleteUser: Scalars['Boolean']['output'];
  feedbackAssignment: Assignment;
  login: LoginOutput;
  loginAdmin: LoginOutput;
  logout: Scalars['Boolean']['output'];
  publishCourse: Course;
  refreshToken: Scalars['String']['output'];
  register: User;
  removeClass: Scalars['Boolean']['output'];
  removeCourse: Scalars['Boolean']['output'];
  removeCourseByAdmin: Scalars['Boolean']['output'];
  removeEnrolment: Scalars['Boolean']['output'];
  removeGrade: Scalars['Boolean']['output'];
  removeQuiz: Scalars['Boolean']['output'];
  removeSubject: Scalars['Boolean']['output'];
  removeTutorRequest: Scalars['Boolean']['output'];
  removeTutorReview: Scalars['Boolean']['output'];
  submitAssignment: Assignment;
  updateBlockStatusUser: Scalars['Boolean']['output'];
  updateClass: Class;
  updateCourse: Course;
  updateGrade: Grade;
  updateQuiz: Quiz;
  updateSubject: Subject;
  updateTutorDetail: TutorDetail;
  updateTutorRequest: TutorRequest;
  updateTutorRequestStatus: TutorRequest;
  updateTutorReview: TutorReview;
};


export type MutationChargeArgs = {
  input: ChargeInput;
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
  input: CreateQuizInput;
};


export type MutationCreateSubjectArgs = {
  input: CreateSubjectInput;
};


export type MutationCreateTutorReportArgs = {
  input: CreateTutorReportInput;
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


export type MutationFeedbackAssignmentArgs = {
  input: FeedbackAssignmentInput;
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


export type MutationRemoveClassArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCourseByAdminArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveGradeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveQuizArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSubjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTutorRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTutorReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitAssignmentArgs = {
  input: SubmitAssignmentInput;
};


export type MutationUpdateBlockStatusUserArgs = {
  input: UpdateBlockStatusUserInput;
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
  input: UpdateQuizInput;
};


export type MutationUpdateSubjectArgs = {
  input: UpdateSubjectInput;
};


export type MutationUpdateTutorDetailArgs = {
  input: UpdateTutorDetailInput;
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

export type Notification = {
  __typename?: 'Notification';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type NotificationPagination = {
  __typename?: 'NotificationPagination';
  items: Array<Notification>;
  meta: PaginationMeta;
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
  amount: Scalars['Float']['output'];
  class: Class;
  classId: Scalars['String']['output'];
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  enrolment: Enrolment;
  enrolmentId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  type: PaymentType;
  user: User;
  userId?: Maybe<Scalars['String']['output']>;
};

export type PaymentFilterParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type PaymentPagination = {
  __typename?: 'PaymentPagination';
  items: Array<Payment>;
  meta: PaginationMeta;
};

export type PaymentQueryParams = {
  filters?: InputMaybe<PaymentFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export enum PaymentType {
  PayIn = 'PAY_IN',
  PayOut = 'PAY_OUT'
}

export type Query = {
  __typename?: 'Query';
  assignment: Assignment;
  assignments: AssignmentPagination;
  assignmentsWithoutPagination: Array<Assignment>;
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
  getUsers: UserPagination;
  grade: Grade;
  grades: GradePagination;
  isEnrolled: Scalars['Boolean']['output'];
  myAssignments: AssignmentPagination;
  myCalendars: Array<Calendar>;
  myEnrolmentByCourse?: Maybe<Enrolment>;
  myEnrolments: EnrolmentsPagination;
  myPayments: PaymentPagination;
  notification: Notification;
  notifications: NotificationPagination;
  payment: Payment;
  payments: PaymentPagination;
  quiz: Quiz;
  quizzes: QuizPagination;
  subject: Subject;
  subjects: SubjectPagination;
  tutorDetail: TutorDetail;
  tutorDetails: TutorDetailPagination;
  tutorReport: TutorReport;
  tutorReports: TutorReportPagination;
  tutorRequest: TutorRequest;
  tutorRequests: TutorRequestPagination;
  tutorReview: TutorReview;
  tutorReviews: TutorReviewPagination;
};


export type QueryAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssignmentsArgs = {
  queryParams: AssignmentQueryParams;
};


export type QueryAssignmentsWithoutPaginationArgs = {
  queryParams: AssignmentFilterParams;
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


export type QueryGetUsersArgs = {
  queryParams: UserQueryParams;
};


export type QueryGradeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGradesArgs = {
  queryParams: QueryParams;
};


export type QueryIsEnrolledArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryMyAssignmentsArgs = {
  queryParams: AssignmentQueryParams;
};


export type QueryMyCalendarsArgs = {
  queryParams?: InputMaybe<CalendarQueryParams>;
};


export type QueryMyEnrolmentByCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryMyEnrolmentsArgs = {
  queryParams?: InputMaybe<EnrolmentQueryParams>;
};


export type QueryMyPaymentsArgs = {
  queryParams: PaymentQueryParams;
};


export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentsArgs = {
  queryParams: PaymentQueryParams;
};


export type QueryQuizArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuizzesArgs = {
  queryParams: QuizQueryParams;
};


export type QuerySubjectArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubjectsArgs = {
  queryParams: QueryParams;
};


export type QueryTutorDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorDetailsArgs = {
  queryParams: TutorDetailQueryParams;
};


export type QueryTutorReportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorReportsArgs = {
  queryParams: TutorReportQueryParams;
};


export type QueryTutorRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorRequestsArgs = {
  queryParams: TutorRequestQueryParams;
};


export type QueryTutorReviewArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTutorReviewsArgs = {
  queryParams: TutorReviewQueryParams;
};

export type QueryParams = {
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type Quiz = {
  __typename?: 'Quiz';
  assignments?: Maybe<Array<Assignment>>;
  class?: Maybe<Class>;
  classId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  files?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  startTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type QuizFilterParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type QuizPagination = {
  __typename?: 'QuizPagination';
  items: Array<Quiz>;
  meta: PaginationMeta;
};

export type QuizQueryParams = {
  filters?: InputMaybe<QuizFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
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

export type SubjectPagination = {
  __typename?: 'SubjectPagination';
  items: Array<Subject>;
  meta: PaginationMeta;
};

export type SubmitAssignmentInput = {
  files: Array<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type TutorDetail = {
  __typename?: 'TutorDetail';
  biography?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  cv: Scalars['String']['output'];
  headline?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  totalReviews: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type TutorDetailFilterParams = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TutorDetailPagination = {
  __typename?: 'TutorDetailPagination';
  items: Array<TutorDetail>;
  meta: PaginationMeta;
};

export type TutorDetailQueryParams = {
  filters?: InputMaybe<TutorDetailFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type TutorReport = {
  __typename?: 'TutorReport';
  author: User;
  authorId: Scalars['String']['output'];
  class: Class;
  classId: Scalars['String']['output'];
  course: Course;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  files?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  reason: Scalars['String']['output'];
  status: TutorReportStatus;
  tutor: User;
  tutorId: Scalars['String']['output'];
};

export type TutorReportFilterParams = {
  tutorId?: InputMaybe<Scalars['ID']['input']>;
};

export type TutorReportPagination = {
  __typename?: 'TutorReportPagination';
  items: Array<TutorReport>;
  meta: PaginationMeta;
};

export type TutorReportQueryParams = {
  filters?: InputMaybe<TutorReportFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export enum TutorReportStatus {
  DoneProcessing = 'DONE_PROCESSING',
  Pending = 'PENDING'
}

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

export type TutorRequestPagination = {
  __typename?: 'TutorRequestPagination';
  items: Array<TutorRequest>;
  meta: PaginationMeta;
};

export type TutorRequestQueryParams = {
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export enum TutorRequestStatus {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Pending = 'PENDING',
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

export type TutorReviewFilterParams = {
  tutorId?: InputMaybe<Scalars['ID']['input']>;
};

export type TutorReviewPagination = {
  __typename?: 'TutorReviewPagination';
  items: Array<TutorReview>;
  meta: PaginationMeta;
};

export type TutorReviewQueryParams = {
  filters?: InputMaybe<TutorReviewFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type UpdateBlockStatusUserInput = {
  id: Scalars['ID']['input'];
  isBlocked: Scalars['Boolean']['input'];
};

export type UpdateClassInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  fee?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  method?: InputMaybe<ClassMethod>;
  name?: InputMaybe<Scalars['String']['input']>;
  schedule?: InputMaybe<Array<ScheduleTimeInput>>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  totalSlots?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  gradeId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  objectives?: InputMaybe<Array<Scalars['String']['input']>>;
  subjectId?: InputMaybe<Scalars['ID']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGradeInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  subjectIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateQuizInput = {
  classId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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
  gender: Gender;
  id: Scalars['ID']['output'];
  isBlocked: Scalars['Boolean']['output'];
  phoneNumber: Scalars['String']['output'];
  role: Role;
  roleId: Scalars['String']['output'];
  tutorDetail?: Maybe<TutorDetail>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserFilterParams = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  roleIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  items: Array<User>;
  meta: PaginationMeta;
};

export type UserQueryParams = {
  filters?: InputMaybe<UserFilterParams>;
  pagination?: InputMaybe<PaginateOptions>;
  sorting?: InputMaybe<Array<SortField>>;
};

export type FeedbackAssignmentMutationVariables = Exact<{
  input: FeedbackAssignmentInput;
}>;


export type FeedbackAssignmentMutation = { __typename?: 'Mutation', feedbackAssignment: { __typename?: 'Assignment', id: string } };

export type GetAssignmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAssignmentQuery = { __typename?: 'Query', assignment: { __typename?: 'Assignment', id: string, files?: Array<string> | null, feedback?: string | null, submittedAt?: any | null, quiz: { __typename?: 'Quiz', id: string, title: string, content: string, files?: Array<string> | null, startTime: any, endTime: any } } };

export type GetAssignmentOnlyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAssignmentOnlyQuery = { __typename?: 'Query', assignment: { __typename?: 'Assignment', id: string, feedback?: string | null } };

export type GetAssignmentsQueryVariables = Exact<{
  queryParams: AssignmentQueryParams;
}>;


export type GetAssignmentsQuery = { __typename?: 'Query', assignments: { __typename?: 'AssignmentPagination', items: Array<{ __typename?: 'Assignment', id: string, files?: Array<string> | null, feedback?: string | null, submittedAt?: any | null, quiz: { __typename?: 'Quiz', title: string, content: string, files?: Array<string> | null, startTime: any, endTime: any } }> } };

export type GetMyAssignmentsQueryVariables = Exact<{
  queryParams: AssignmentQueryParams;
}>;


export type GetMyAssignmentsQuery = { __typename?: 'Query', myAssignments: { __typename?: 'AssignmentPagination', items: Array<{ __typename?: 'Assignment', id: string, files?: Array<string> | null, feedback?: string | null, submittedAt?: any | null, quiz: { __typename?: 'Quiz', title: string, content: string, files?: Array<string> | null, startTime: any, endTime: any } }> } };

export type SubmitAssignmentMutationVariables = Exact<{
  input: SubmitAssignmentInput;
}>;


export type SubmitAssignmentMutation = { __typename?: 'Mutation', submitAssignment: { __typename?: 'Assignment', id: string } };

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


export type GetMyCalendarQuery = { __typename?: 'Query', myCalendars: Array<{ __typename?: 'Calendar', id: string, courseName: string, className: string, tutorName?: string | null, status: CourseStatus, method: ClassMethod, date: any, startTime: string, endTime: string, courseId: string, classId: string, tutorId?: string | null, class?: { __typename?: 'Class', address?: string | null } | null }> };

export type CreateClassMutationVariables = Exact<{
  input: CreateClassInput;
}>;


export type CreateClassMutation = { __typename?: 'Mutation', createClass: { __typename?: 'Class', id: string } };

export type GetClassQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetClassQuery = { __typename?: 'Query', getClass: { __typename?: 'Class', id: string, name: string, fee: number, startDate: any, endDate: any, method: ClassMethod, totalSlots: number, schedule: Array<{ __typename?: 'ScheduleTime', dayOfWeek: number, startTime: string, endTime: string }> } };

export type ClassesQueryVariables = Exact<{
  queryParams: ClassQueryParams;
}>;


export type ClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: string, name: string, method: ClassMethod, startDate: any, endDate: any, occupiedSlots: number, totalSlots: number, schedule: Array<{ __typename?: 'ScheduleTime', dayOfWeek: number, startTime: string, endTime: string }> }> };

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


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', id: string } };

export type CourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, thumbnail?: string | null, description?: string | null, objectives?: Array<string> | null, isPublished: boolean, status: CourseStatus, userId: string, gradeId: string, subjectId: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, tutorDetail?: { __typename?: 'TutorDetail', rating?: number | null, totalReviews: number, headline?: string | null, biography?: string | null } | null }, grade: { __typename?: 'Grade', id: string, name: string }, subject: { __typename?: 'Subject', id: string, name: string }, classes?: Array<{ __typename?: 'Class', id: string, name: string, fee: number, address?: string | null, startDate: any, endDate: any, method: ClassMethod, totalSlots: number, occupiedSlots: number, schedule: Array<{ __typename?: 'ScheduleTime', dayOfWeek: number, startTime: string, endTime: string }> }> | null } };

export type CoursesQueryVariables = Exact<{
  queryParams: CourseQueryParams;
}>;


export type CoursesQuery = { __typename?: 'Query', courses: { __typename?: 'CoursesPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Course', id: string, name: string, thumbnail?: string | null, description?: string | null, objectives?: Array<string> | null, isPublished: boolean, status: CourseStatus, userId: string, gradeId: string, subjectId: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, email: string, tutorDetail?: { __typename?: 'TutorDetail', rating?: number | null, totalReviews: number } | null }, classes?: Array<{ __typename?: 'Class', name: string, address?: string | null, fee: number, occupiedSlots: number, totalSlots: number, startDate: any, endDate: any }> | null }> } };

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
  input: CreateEnrolmentInput;
}>;


export type CreateEnrolmentMutation = { __typename?: 'Mutation', createEnrolment: { __typename?: 'Enrolment', id: string } };

export type GetMyEnrolmentByCourseQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type GetMyEnrolmentByCourseQuery = { __typename?: 'Query', myEnrolmentByCourse?: { __typename?: 'Enrolment', id: string, paymentId?: string | null, class: { __typename?: 'Class', id: string, name: string, address?: string | null, method: ClassMethod, fee: number, startDate: any, endDate: any, schedule: Array<{ __typename?: 'ScheduleTime', dayOfWeek: number, startTime: string, endTime: string }> }, course: { __typename?: 'Course', id: string, name: string, thumbnail?: string | null, description?: string | null, status: CourseStatus, user: { __typename?: 'User', id: string, fullName: string, avatar?: string | null } } } | null };

export type GetMyEnrolmentsQueryVariables = Exact<{
  queryParams?: InputMaybe<EnrolmentQueryParams>;
}>;


export type GetMyEnrolmentsQuery = { __typename?: 'Query', myEnrolments: { __typename?: 'EnrolmentsPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Enrolment', id: string, status: EnrolmentStatus, paymentId?: string | null, overduePaymentAt: any, course: { __typename?: 'Course', id: string, name: string, status: CourseStatus, thumbnail?: string | null, user: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, email: string, phoneNumber: string, gender: Gender, birthday: any } }, class: { __typename?: 'Class', id: string, name: string, fee: number, startDate: any, endDate: any } }> } };

export type StudentEnrolmentsQueryVariables = Exact<{
  queryParams?: InputMaybe<EnrolmentQueryParams>;
}>;


export type StudentEnrolmentsQuery = { __typename?: 'Query', enrolments: { __typename?: 'EnrolmentsPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Enrolment', id: string, createdAt: any, user: { __typename?: 'User', id: string, fullName: string, email: string, avatar?: string | null, gender: Gender, birthday: any, phoneNumber: string } }> } };

export type IsEnrolledQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type IsEnrolledQuery = { __typename?: 'Query', isEnrolled: boolean };

export type IsOverduePaymentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IsOverduePaymentQuery = { __typename?: 'Query', enrolment: { __typename?: 'Enrolment', id: string, status: EnrolmentStatus, classId: string, paymentId?: string | null } };

export type IsPayForCourseQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type IsPayForCourseQuery = { __typename?: 'Query', myEnrolmentByCourse?: { __typename?: 'Enrolment', id: string, status: EnrolmentStatus, classId: string, paymentId?: string | null, startTime: any, endTime: any } | null };

export type GradesQueryVariables = Exact<{
  queryParams: QueryParams;
}>;


export type GradesQuery = { __typename?: 'Query', grades: { __typename?: 'GradePagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Grade', id: string, name: string, createdAt: any, updatedAt: any }> } };

export type ChargeMutationVariables = Exact<{
  input: ChargeInput;
}>;


export type ChargeMutation = { __typename?: 'Mutation', charge: { __typename?: 'Payment', id: string } };

export type GetMyPaymentsQueryVariables = Exact<{
  queryParams: PaymentQueryParams;
}>;


export type GetMyPaymentsQuery = { __typename?: 'Query', myPayments: { __typename?: 'PaymentPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Payment', id: string, amount: number, type: PaymentType, note: string, createdAt: any, class: { __typename?: 'Class', name: string, startDate: any, endDate: any }, course: { __typename?: 'Course', name: string }, enrolment: { __typename?: 'Enrolment', startTime: any, endTime: any } }> } };

export type GetPaymentsQueryVariables = Exact<{
  queryParams: PaymentQueryParams;
}>;


export type GetPaymentsQuery = { __typename?: 'Query', payments: { __typename?: 'PaymentPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Payment', id: string, amount: number, type: PaymentType, note: string, createdAt: any, user: { __typename?: 'User', fullName: string }, class: { __typename?: 'Class', name: string, startDate: any, endDate: any }, course: { __typename?: 'Course', name: string }, enrolment: { __typename?: 'Enrolment', startTime: any, endTime: any } }> } };

export type CreateQuizMutationVariables = Exact<{
  input: CreateQuizInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'Quiz', id: string, title: string } };

export type GetQuizQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetQuizQuery = { __typename?: 'Query', quiz: { __typename?: 'Quiz', id: string, title: string, content: string, classId: string, courseId: string, files?: Array<string> | null, startTime: any, endTime: any } };

export type GetQuizzesQueryVariables = Exact<{
  queryParams: QuizQueryParams;
}>;


export type GetQuizzesQuery = { __typename?: 'Query', quizzes: { __typename?: 'QuizPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Quiz', id: string, title: string, startTime: any, endTime: any, createdAt: any, class?: { __typename?: 'Class', name: string } | null }> } };

export type GetQuizzesWithAssignmentsQueryVariables = Exact<{
  queryParams: QuizQueryParams;
}>;


export type GetQuizzesWithAssignmentsQuery = { __typename?: 'Query', quizzes: { __typename?: 'QuizPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Quiz', id: string, title: string, startTime: any, endTime: any, createdAt: any, class?: { __typename?: 'Class', name: string } | null, assignments?: Array<{ __typename?: 'Assignment', id: string, files?: Array<string> | null, feedback?: string | null, updatedAt: any, quizId: string, user: { __typename?: 'User', fullName: string } }> | null }> } };

export type RemoveQuizMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveQuizMutation = { __typename?: 'Mutation', removeQuiz: boolean };

export type UpdateQuizMutationVariables = Exact<{
  input: UpdateQuizInput;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', updateQuiz: { __typename?: 'Quiz', id: string } };

export type SubjectsQueryVariables = Exact<{
  queryParams: QueryParams;
}>;


export type SubjectsQuery = { __typename?: 'Query', subjects: { __typename?: 'SubjectPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'Subject', id: string, name: string, createdAt: any, updatedAt: any }> } };

export type TutorDetailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TutorDetailQuery = { __typename?: 'Query', tutorDetail: { __typename?: 'TutorDetail', id: string, headline?: string | null, biography?: string | null, cv: string, userId: string, user: { __typename?: 'User', id: string, fullName: string, avatar?: string | null } } };

export type TutorDetailsQueryVariables = Exact<{
  queryParams: TutorDetailQueryParams;
}>;


export type TutorDetailsQuery = { __typename?: 'Query', tutorDetails: { __typename?: 'TutorDetailPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'TutorDetail', id: string, headline?: string | null, biography?: string | null, cv: string, userId: string, user: { __typename?: 'User', id: string, fullName: string, avatar?: string | null } }> } };

export type CreateTutorReportMutationVariables = Exact<{
  input: CreateTutorReportInput;
}>;


export type CreateTutorReportMutation = { __typename?: 'Mutation', createTutorReport: { __typename?: 'TutorReport', id: string } };

export type CreateTutorRequestMutationVariables = Exact<{
  input: CreateTutorRequestInput;
}>;


export type CreateTutorRequestMutation = { __typename?: 'Mutation', createTutorRequest: { __typename?: 'TutorRequest', id: string } };

export type CreateTutorReviewMutationVariables = Exact<{
  input: CreateTutorReviewInput;
}>;


export type CreateTutorReviewMutation = { __typename?: 'Mutation', createTutorReview: { __typename?: 'TutorReview', id: string } };

export type GetTutorReviewsQueryVariables = Exact<{
  queryParams: TutorReviewQueryParams;
}>;


export type GetTutorReviewsQuery = { __typename?: 'Query', tutorReviews: { __typename?: 'TutorReviewPagination', meta: { __typename?: 'PaginationMeta', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ __typename?: 'TutorReview', id: string, comment: string, rating: number, authorId: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: string, fullName: string, avatar?: string | null } }> } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'User', id: string, email: string, fullName: string, avatar?: string | null, phoneNumber: string, gender: Gender, birthday: any, roleId: string, createdAt: any, updatedAt: any, role: { __typename?: 'Role', name: string } } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, avatar?: string | null, fullName: string, email: string, tutorDetail?: { __typename?: 'TutorDetail', headline?: string | null, biography?: string | null, rating?: number | null, totalReviews: number } | null } };


export const FeedbackAssignmentDocument = gql`
    mutation feedbackAssignment($input: FeedbackAssignmentInput!) {
  feedbackAssignment(input: $input) {
    id
  }
}
    `;
export type FeedbackAssignmentMutationFn = Apollo.MutationFunction<FeedbackAssignmentMutation, FeedbackAssignmentMutationVariables>;

/**
 * __useFeedbackAssignmentMutation__
 *
 * To run a mutation, you first call `useFeedbackAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeedbackAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feedbackAssignmentMutation, { data, loading, error }] = useFeedbackAssignmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeedbackAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<FeedbackAssignmentMutation, FeedbackAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FeedbackAssignmentMutation, FeedbackAssignmentMutationVariables>(FeedbackAssignmentDocument, options);
      }
export type FeedbackAssignmentMutationHookResult = ReturnType<typeof useFeedbackAssignmentMutation>;
export type FeedbackAssignmentMutationResult = Apollo.MutationResult<FeedbackAssignmentMutation>;
export type FeedbackAssignmentMutationOptions = Apollo.BaseMutationOptions<FeedbackAssignmentMutation, FeedbackAssignmentMutationVariables>;
export const GetAssignmentDocument = gql`
    query getAssignment($id: ID!) {
  assignment(id: $id) {
    id
    files
    feedback
    submittedAt
    quiz {
      id
      title
      content
      files
      startTime
      endTime
    }
  }
}
    `;

/**
 * __useGetAssignmentQuery__
 *
 * To run a query within a React component, call `useGetAssignmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAssignmentQuery(baseOptions: Apollo.QueryHookOptions<GetAssignmentQuery, GetAssignmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssignmentQuery, GetAssignmentQueryVariables>(GetAssignmentDocument, options);
      }
export function useGetAssignmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssignmentQuery, GetAssignmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssignmentQuery, GetAssignmentQueryVariables>(GetAssignmentDocument, options);
        }
export type GetAssignmentQueryHookResult = ReturnType<typeof useGetAssignmentQuery>;
export type GetAssignmentLazyQueryHookResult = ReturnType<typeof useGetAssignmentLazyQuery>;
export type GetAssignmentQueryResult = Apollo.QueryResult<GetAssignmentQuery, GetAssignmentQueryVariables>;
export const GetAssignmentOnlyDocument = gql`
    query getAssignmentOnly($id: ID!) {
  assignment(id: $id) {
    id
    feedback
  }
}
    `;

/**
 * __useGetAssignmentOnlyQuery__
 *
 * To run a query within a React component, call `useGetAssignmentOnlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignmentOnlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignmentOnlyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAssignmentOnlyQuery(baseOptions: Apollo.QueryHookOptions<GetAssignmentOnlyQuery, GetAssignmentOnlyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssignmentOnlyQuery, GetAssignmentOnlyQueryVariables>(GetAssignmentOnlyDocument, options);
      }
export function useGetAssignmentOnlyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssignmentOnlyQuery, GetAssignmentOnlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssignmentOnlyQuery, GetAssignmentOnlyQueryVariables>(GetAssignmentOnlyDocument, options);
        }
export type GetAssignmentOnlyQueryHookResult = ReturnType<typeof useGetAssignmentOnlyQuery>;
export type GetAssignmentOnlyLazyQueryHookResult = ReturnType<typeof useGetAssignmentOnlyLazyQuery>;
export type GetAssignmentOnlyQueryResult = Apollo.QueryResult<GetAssignmentOnlyQuery, GetAssignmentOnlyQueryVariables>;
export const GetAssignmentsDocument = gql`
    query getAssignments($queryParams: AssignmentQueryParams!) {
  assignments(queryParams: $queryParams) {
    items {
      id
      files
      feedback
      submittedAt
      quiz {
        title
        content
        files
        startTime
        endTime
      }
    }
  }
}
    `;

/**
 * __useGetAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignmentsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetAssignmentsQuery(baseOptions: Apollo.QueryHookOptions<GetAssignmentsQuery, GetAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssignmentsQuery, GetAssignmentsQueryVariables>(GetAssignmentsDocument, options);
      }
export function useGetAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssignmentsQuery, GetAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssignmentsQuery, GetAssignmentsQueryVariables>(GetAssignmentsDocument, options);
        }
export type GetAssignmentsQueryHookResult = ReturnType<typeof useGetAssignmentsQuery>;
export type GetAssignmentsLazyQueryHookResult = ReturnType<typeof useGetAssignmentsLazyQuery>;
export type GetAssignmentsQueryResult = Apollo.QueryResult<GetAssignmentsQuery, GetAssignmentsQueryVariables>;
export const GetMyAssignmentsDocument = gql`
    query getMyAssignments($queryParams: AssignmentQueryParams!) {
  myAssignments(queryParams: $queryParams) {
    items {
      id
      files
      feedback
      submittedAt
      quiz {
        title
        content
        files
        startTime
        endTime
      }
    }
  }
}
    `;

/**
 * __useGetMyAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetMyAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAssignmentsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetMyAssignmentsQuery(baseOptions: Apollo.QueryHookOptions<GetMyAssignmentsQuery, GetMyAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAssignmentsQuery, GetMyAssignmentsQueryVariables>(GetMyAssignmentsDocument, options);
      }
export function useGetMyAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAssignmentsQuery, GetMyAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAssignmentsQuery, GetMyAssignmentsQueryVariables>(GetMyAssignmentsDocument, options);
        }
export type GetMyAssignmentsQueryHookResult = ReturnType<typeof useGetMyAssignmentsQuery>;
export type GetMyAssignmentsLazyQueryHookResult = ReturnType<typeof useGetMyAssignmentsLazyQuery>;
export type GetMyAssignmentsQueryResult = Apollo.QueryResult<GetMyAssignmentsQuery, GetMyAssignmentsQueryVariables>;
export const SubmitAssignmentDocument = gql`
    mutation submitAssignment($input: SubmitAssignmentInput!) {
  submitAssignment(input: $input) {
    id
  }
}
    `;
export type SubmitAssignmentMutationFn = Apollo.MutationFunction<SubmitAssignmentMutation, SubmitAssignmentMutationVariables>;

/**
 * __useSubmitAssignmentMutation__
 *
 * To run a mutation, you first call `useSubmitAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAssignmentMutation, { data, loading, error }] = useSubmitAssignmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<SubmitAssignmentMutation, SubmitAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitAssignmentMutation, SubmitAssignmentMutationVariables>(SubmitAssignmentDocument, options);
      }
export type SubmitAssignmentMutationHookResult = ReturnType<typeof useSubmitAssignmentMutation>;
export type SubmitAssignmentMutationResult = Apollo.MutationResult<SubmitAssignmentMutation>;
export type SubmitAssignmentMutationOptions = Apollo.BaseMutationOptions<SubmitAssignmentMutation, SubmitAssignmentMutationVariables>;
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
    class {
      address
    }
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
    fee
    startDate
    endDate
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
    startDate
    endDate
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
    isPublished
    status
    userId
    user {
      id
      avatar
      fullName
      tutorDetail {
        rating
        totalReviews
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
      fee
      address
      startDate
      endDate
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
      isPublished
      status
      userId
      user {
        id
        avatar
        fullName
        email
        tutorDetail {
          rating
          totalReviews
        }
      }
      classes {
        name
        address
        fee
        occupiedSlots
        totalSlots
        startDate
        endDate
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
    mutation createEnrolment($input: CreateEnrolmentInput!) {
  createEnrolment(input: $input) {
    id
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
 *      input: // value for 'input'
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
export const GetMyEnrolmentByCourseDocument = gql`
    query getMyEnrolmentByCourse($courseId: ID!) {
  myEnrolmentByCourse(courseId: $courseId) {
    id
    class {
      id
      name
      address
      method
      fee
      startDate
      endDate
      schedule {
        dayOfWeek
        startTime
        endTime
      }
    }
    course {
      id
      name
      thumbnail
      description
      status
      user {
        id
        fullName
        avatar
      }
    }
    paymentId
  }
}
    `;

/**
 * __useGetMyEnrolmentByCourseQuery__
 *
 * To run a query within a React component, call `useGetMyEnrolmentByCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEnrolmentByCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEnrolmentByCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetMyEnrolmentByCourseQuery(baseOptions: Apollo.QueryHookOptions<GetMyEnrolmentByCourseQuery, GetMyEnrolmentByCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyEnrolmentByCourseQuery, GetMyEnrolmentByCourseQueryVariables>(GetMyEnrolmentByCourseDocument, options);
      }
export function useGetMyEnrolmentByCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyEnrolmentByCourseQuery, GetMyEnrolmentByCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyEnrolmentByCourseQuery, GetMyEnrolmentByCourseQueryVariables>(GetMyEnrolmentByCourseDocument, options);
        }
export type GetMyEnrolmentByCourseQueryHookResult = ReturnType<typeof useGetMyEnrolmentByCourseQuery>;
export type GetMyEnrolmentByCourseLazyQueryHookResult = ReturnType<typeof useGetMyEnrolmentByCourseLazyQuery>;
export type GetMyEnrolmentByCourseQueryResult = Apollo.QueryResult<GetMyEnrolmentByCourseQuery, GetMyEnrolmentByCourseQueryVariables>;
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
      status
      course {
        id
        name
        status
        thumbnail
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
      class {
        id
        name
        fee
        startDate
        endDate
      }
      paymentId
      overduePaymentAt
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
export const IsOverduePaymentDocument = gql`
    query isOverduePayment($id: ID!) {
  enrolment(id: $id) {
    id
    status
    classId
    paymentId
  }
}
    `;

/**
 * __useIsOverduePaymentQuery__
 *
 * To run a query within a React component, call `useIsOverduePaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsOverduePaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsOverduePaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIsOverduePaymentQuery(baseOptions: Apollo.QueryHookOptions<IsOverduePaymentQuery, IsOverduePaymentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsOverduePaymentQuery, IsOverduePaymentQueryVariables>(IsOverduePaymentDocument, options);
      }
export function useIsOverduePaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsOverduePaymentQuery, IsOverduePaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsOverduePaymentQuery, IsOverduePaymentQueryVariables>(IsOverduePaymentDocument, options);
        }
export type IsOverduePaymentQueryHookResult = ReturnType<typeof useIsOverduePaymentQuery>;
export type IsOverduePaymentLazyQueryHookResult = ReturnType<typeof useIsOverduePaymentLazyQuery>;
export type IsOverduePaymentQueryResult = Apollo.QueryResult<IsOverduePaymentQuery, IsOverduePaymentQueryVariables>;
export const IsPayForCourseDocument = gql`
    query isPayForCourse($courseId: ID!) {
  myEnrolmentByCourse(courseId: $courseId) {
    id
    status
    classId
    paymentId
    startTime
    endTime
  }
}
    `;

/**
 * __useIsPayForCourseQuery__
 *
 * To run a query within a React component, call `useIsPayForCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsPayForCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsPayForCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useIsPayForCourseQuery(baseOptions: Apollo.QueryHookOptions<IsPayForCourseQuery, IsPayForCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsPayForCourseQuery, IsPayForCourseQueryVariables>(IsPayForCourseDocument, options);
      }
export function useIsPayForCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsPayForCourseQuery, IsPayForCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsPayForCourseQuery, IsPayForCourseQueryVariables>(IsPayForCourseDocument, options);
        }
export type IsPayForCourseQueryHookResult = ReturnType<typeof useIsPayForCourseQuery>;
export type IsPayForCourseLazyQueryHookResult = ReturnType<typeof useIsPayForCourseLazyQuery>;
export type IsPayForCourseQueryResult = Apollo.QueryResult<IsPayForCourseQuery, IsPayForCourseQueryVariables>;
export const GradesDocument = gql`
    query grades($queryParams: QueryParams!) {
  grades(queryParams: $queryParams) {
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
      createdAt
      updatedAt
    }
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
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGradesQuery(baseOptions: Apollo.QueryHookOptions<GradesQuery, GradesQueryVariables>) {
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
export const ChargeDocument = gql`
    mutation charge($input: ChargeInput!) {
  charge(input: $input) {
    id
  }
}
    `;
export type ChargeMutationFn = Apollo.MutationFunction<ChargeMutation, ChargeMutationVariables>;

/**
 * __useChargeMutation__
 *
 * To run a mutation, you first call `useChargeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChargeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chargeMutation, { data, loading, error }] = useChargeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChargeMutation(baseOptions?: Apollo.MutationHookOptions<ChargeMutation, ChargeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChargeMutation, ChargeMutationVariables>(ChargeDocument, options);
      }
export type ChargeMutationHookResult = ReturnType<typeof useChargeMutation>;
export type ChargeMutationResult = Apollo.MutationResult<ChargeMutation>;
export type ChargeMutationOptions = Apollo.BaseMutationOptions<ChargeMutation, ChargeMutationVariables>;
export const GetMyPaymentsDocument = gql`
    query getMyPayments($queryParams: PaymentQueryParams!) {
  myPayments(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      amount
      type
      note
      class {
        name
        startDate
        endDate
      }
      course {
        name
      }
      enrolment {
        startTime
        endTime
      }
      createdAt
    }
  }
}
    `;

/**
 * __useGetMyPaymentsQuery__
 *
 * To run a query within a React component, call `useGetMyPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPaymentsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetMyPaymentsQuery(baseOptions: Apollo.QueryHookOptions<GetMyPaymentsQuery, GetMyPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyPaymentsQuery, GetMyPaymentsQueryVariables>(GetMyPaymentsDocument, options);
      }
export function useGetMyPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyPaymentsQuery, GetMyPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyPaymentsQuery, GetMyPaymentsQueryVariables>(GetMyPaymentsDocument, options);
        }
export type GetMyPaymentsQueryHookResult = ReturnType<typeof useGetMyPaymentsQuery>;
export type GetMyPaymentsLazyQueryHookResult = ReturnType<typeof useGetMyPaymentsLazyQuery>;
export type GetMyPaymentsQueryResult = Apollo.QueryResult<GetMyPaymentsQuery, GetMyPaymentsQueryVariables>;
export const GetPaymentsDocument = gql`
    query getPayments($queryParams: PaymentQueryParams!) {
  payments(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      amount
      type
      note
      user {
        fullName
      }
      class {
        name
        startDate
        endDate
      }
      course {
        name
      }
      enrolment {
        startTime
        endTime
      }
      createdAt
    }
  }
}
    `;

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetPaymentsQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
      }
export function useGetPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentsLazyQuery>;
export type GetPaymentsQueryResult = Apollo.QueryResult<GetPaymentsQuery, GetPaymentsQueryVariables>;
export const CreateQuizDocument = gql`
    mutation createQuiz($input: CreateQuizInput!) {
  createQuiz(input: $input) {
    id
    title
  }
}
    `;
export type CreateQuizMutationFn = Apollo.MutationFunction<CreateQuizMutation, CreateQuizMutationVariables>;

/**
 * __useCreateQuizMutation__
 *
 * To run a mutation, you first call `useCreateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizMutation, { data, loading, error }] = useCreateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuizMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizMutation, CreateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(CreateQuizDocument, options);
      }
export type CreateQuizMutationHookResult = ReturnType<typeof useCreateQuizMutation>;
export type CreateQuizMutationResult = Apollo.MutationResult<CreateQuizMutation>;
export type CreateQuizMutationOptions = Apollo.BaseMutationOptions<CreateQuizMutation, CreateQuizMutationVariables>;
export const GetQuizDocument = gql`
    query getQuiz($id: ID!) {
  quiz(id: $id) {
    id
    title
    content
    classId
    courseId
    files
    startTime
    endTime
  }
}
    `;

/**
 * __useGetQuizQuery__
 *
 * To run a query within a React component, call `useGetQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQuizQuery(baseOptions: Apollo.QueryHookOptions<GetQuizQuery, GetQuizQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizQuery, GetQuizQueryVariables>(GetQuizDocument, options);
      }
export function useGetQuizLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizQuery, GetQuizQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizQuery, GetQuizQueryVariables>(GetQuizDocument, options);
        }
export type GetQuizQueryHookResult = ReturnType<typeof useGetQuizQuery>;
export type GetQuizLazyQueryHookResult = ReturnType<typeof useGetQuizLazyQuery>;
export type GetQuizQueryResult = Apollo.QueryResult<GetQuizQuery, GetQuizQueryVariables>;
export const GetQuizzesDocument = gql`
    query getQuizzes($queryParams: QuizQueryParams!) {
  quizzes(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      title
      startTime
      endTime
      createdAt
      class {
        name
      }
    }
  }
}
    `;

/**
 * __useGetQuizzesQuery__
 *
 * To run a query within a React component, call `useGetQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizzesQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetQuizzesQuery(baseOptions: Apollo.QueryHookOptions<GetQuizzesQuery, GetQuizzesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizzesQuery, GetQuizzesQueryVariables>(GetQuizzesDocument, options);
      }
export function useGetQuizzesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizzesQuery, GetQuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizzesQuery, GetQuizzesQueryVariables>(GetQuizzesDocument, options);
        }
export type GetQuizzesQueryHookResult = ReturnType<typeof useGetQuizzesQuery>;
export type GetQuizzesLazyQueryHookResult = ReturnType<typeof useGetQuizzesLazyQuery>;
export type GetQuizzesQueryResult = Apollo.QueryResult<GetQuizzesQuery, GetQuizzesQueryVariables>;
export const GetQuizzesWithAssignmentsDocument = gql`
    query getQuizzesWithAssignments($queryParams: QuizQueryParams!) {
  quizzes(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      title
      startTime
      endTime
      createdAt
      class {
        name
      }
      assignments {
        id
        files
        feedback
        updatedAt
        quizId
        user {
          fullName
        }
      }
    }
  }
}
    `;

/**
 * __useGetQuizzesWithAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetQuizzesWithAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizzesWithAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizzesWithAssignmentsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetQuizzesWithAssignmentsQuery(baseOptions: Apollo.QueryHookOptions<GetQuizzesWithAssignmentsQuery, GetQuizzesWithAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizzesWithAssignmentsQuery, GetQuizzesWithAssignmentsQueryVariables>(GetQuizzesWithAssignmentsDocument, options);
      }
export function useGetQuizzesWithAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizzesWithAssignmentsQuery, GetQuizzesWithAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizzesWithAssignmentsQuery, GetQuizzesWithAssignmentsQueryVariables>(GetQuizzesWithAssignmentsDocument, options);
        }
export type GetQuizzesWithAssignmentsQueryHookResult = ReturnType<typeof useGetQuizzesWithAssignmentsQuery>;
export type GetQuizzesWithAssignmentsLazyQueryHookResult = ReturnType<typeof useGetQuizzesWithAssignmentsLazyQuery>;
export type GetQuizzesWithAssignmentsQueryResult = Apollo.QueryResult<GetQuizzesWithAssignmentsQuery, GetQuizzesWithAssignmentsQueryVariables>;
export const RemoveQuizDocument = gql`
    mutation removeQuiz($id: ID!) {
  removeQuiz(id: $id)
}
    `;
export type RemoveQuizMutationFn = Apollo.MutationFunction<RemoveQuizMutation, RemoveQuizMutationVariables>;

/**
 * __useRemoveQuizMutation__
 *
 * To run a mutation, you first call `useRemoveQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeQuizMutation, { data, loading, error }] = useRemoveQuizMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveQuizMutation(baseOptions?: Apollo.MutationHookOptions<RemoveQuizMutation, RemoveQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveQuizMutation, RemoveQuizMutationVariables>(RemoveQuizDocument, options);
      }
export type RemoveQuizMutationHookResult = ReturnType<typeof useRemoveQuizMutation>;
export type RemoveQuizMutationResult = Apollo.MutationResult<RemoveQuizMutation>;
export type RemoveQuizMutationOptions = Apollo.BaseMutationOptions<RemoveQuizMutation, RemoveQuizMutationVariables>;
export const UpdateQuizDocument = gql`
    mutation updateQuiz($input: UpdateQuizInput!) {
  updateQuiz(input: $input) {
    id
  }
}
    `;
export type UpdateQuizMutationFn = Apollo.MutationFunction<UpdateQuizMutation, UpdateQuizMutationVariables>;

/**
 * __useUpdateQuizMutation__
 *
 * To run a mutation, you first call `useUpdateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuizMutation, { data, loading, error }] = useUpdateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQuizMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuizMutation, UpdateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuizMutation, UpdateQuizMutationVariables>(UpdateQuizDocument, options);
      }
export type UpdateQuizMutationHookResult = ReturnType<typeof useUpdateQuizMutation>;
export type UpdateQuizMutationResult = Apollo.MutationResult<UpdateQuizMutation>;
export type UpdateQuizMutationOptions = Apollo.BaseMutationOptions<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const SubjectsDocument = gql`
    query subjects($queryParams: QueryParams!) {
  subjects(queryParams: $queryParams) {
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
      createdAt
      updatedAt
    }
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
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useSubjectsQuery(baseOptions: Apollo.QueryHookOptions<SubjectsQuery, SubjectsQueryVariables>) {
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
export const TutorDetailDocument = gql`
    query tutorDetail($id: ID!) {
  tutorDetail(id: $id) {
    id
    headline
    biography
    cv
    userId
    user {
      id
      fullName
      avatar
    }
  }
}
    `;

/**
 * __useTutorDetailQuery__
 *
 * To run a query within a React component, call `useTutorDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useTutorDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTutorDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTutorDetailQuery(baseOptions: Apollo.QueryHookOptions<TutorDetailQuery, TutorDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TutorDetailQuery, TutorDetailQueryVariables>(TutorDetailDocument, options);
      }
export function useTutorDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TutorDetailQuery, TutorDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TutorDetailQuery, TutorDetailQueryVariables>(TutorDetailDocument, options);
        }
export type TutorDetailQueryHookResult = ReturnType<typeof useTutorDetailQuery>;
export type TutorDetailLazyQueryHookResult = ReturnType<typeof useTutorDetailLazyQuery>;
export type TutorDetailQueryResult = Apollo.QueryResult<TutorDetailQuery, TutorDetailQueryVariables>;
export const TutorDetailsDocument = gql`
    query tutorDetails($queryParams: TutorDetailQueryParams!) {
  tutorDetails(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      headline
      biography
      cv
      userId
      user {
        id
        fullName
        avatar
      }
    }
  }
}
    `;

/**
 * __useTutorDetailsQuery__
 *
 * To run a query within a React component, call `useTutorDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTutorDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTutorDetailsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useTutorDetailsQuery(baseOptions: Apollo.QueryHookOptions<TutorDetailsQuery, TutorDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TutorDetailsQuery, TutorDetailsQueryVariables>(TutorDetailsDocument, options);
      }
export function useTutorDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TutorDetailsQuery, TutorDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TutorDetailsQuery, TutorDetailsQueryVariables>(TutorDetailsDocument, options);
        }
export type TutorDetailsQueryHookResult = ReturnType<typeof useTutorDetailsQuery>;
export type TutorDetailsLazyQueryHookResult = ReturnType<typeof useTutorDetailsLazyQuery>;
export type TutorDetailsQueryResult = Apollo.QueryResult<TutorDetailsQuery, TutorDetailsQueryVariables>;
export const CreateTutorReportDocument = gql`
    mutation createTutorReport($input: CreateTutorReportInput!) {
  createTutorReport(input: $input) {
    id
  }
}
    `;
export type CreateTutorReportMutationFn = Apollo.MutationFunction<CreateTutorReportMutation, CreateTutorReportMutationVariables>;

/**
 * __useCreateTutorReportMutation__
 *
 * To run a mutation, you first call `useCreateTutorReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTutorReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTutorReportMutation, { data, loading, error }] = useCreateTutorReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTutorReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateTutorReportMutation, CreateTutorReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTutorReportMutation, CreateTutorReportMutationVariables>(CreateTutorReportDocument, options);
      }
export type CreateTutorReportMutationHookResult = ReturnType<typeof useCreateTutorReportMutation>;
export type CreateTutorReportMutationResult = Apollo.MutationResult<CreateTutorReportMutation>;
export type CreateTutorReportMutationOptions = Apollo.BaseMutationOptions<CreateTutorReportMutation, CreateTutorReportMutationVariables>;
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
export const CreateTutorReviewDocument = gql`
    mutation createTutorReview($input: CreateTutorReviewInput!) {
  createTutorReview(input: $input) {
    id
  }
}
    `;
export type CreateTutorReviewMutationFn = Apollo.MutationFunction<CreateTutorReviewMutation, CreateTutorReviewMutationVariables>;

/**
 * __useCreateTutorReviewMutation__
 *
 * To run a mutation, you first call `useCreateTutorReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTutorReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTutorReviewMutation, { data, loading, error }] = useCreateTutorReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTutorReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateTutorReviewMutation, CreateTutorReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTutorReviewMutation, CreateTutorReviewMutationVariables>(CreateTutorReviewDocument, options);
      }
export type CreateTutorReviewMutationHookResult = ReturnType<typeof useCreateTutorReviewMutation>;
export type CreateTutorReviewMutationResult = Apollo.MutationResult<CreateTutorReviewMutation>;
export type CreateTutorReviewMutationOptions = Apollo.BaseMutationOptions<CreateTutorReviewMutation, CreateTutorReviewMutationVariables>;
export const GetTutorReviewsDocument = gql`
    query getTutorReviews($queryParams: TutorReviewQueryParams!) {
  tutorReviews(queryParams: $queryParams) {
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
    items {
      id
      comment
      rating
      authorId
      author {
        id
        fullName
        avatar
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetTutorReviewsQuery__
 *
 * To run a query within a React component, call `useGetTutorReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTutorReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTutorReviewsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetTutorReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetTutorReviewsQuery, GetTutorReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTutorReviewsQuery, GetTutorReviewsQueryVariables>(GetTutorReviewsDocument, options);
      }
export function useGetTutorReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTutorReviewsQuery, GetTutorReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTutorReviewsQuery, GetTutorReviewsQueryVariables>(GetTutorReviewsDocument, options);
        }
export type GetTutorReviewsQueryHookResult = ReturnType<typeof useGetTutorReviewsQuery>;
export type GetTutorReviewsLazyQueryHookResult = ReturnType<typeof useGetTutorReviewsLazyQuery>;
export type GetTutorReviewsQueryResult = Apollo.QueryResult<GetTutorReviewsQuery, GetTutorReviewsQueryVariables>;
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
export const GetUserDocument = gql`
    query getUser($id: ID!) {
  getUser(id: $id) {
    id
    avatar
    fullName
    email
    tutorDetail {
      headline
      biography
      rating
      totalReviews
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;