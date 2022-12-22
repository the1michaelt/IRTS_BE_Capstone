from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import StudentCourse, User
from .serializers import StudentCourseSerializer

#USERS
# Get all the logged in user's courses, aka transcript
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transcript(request):
    """api/student_courses/get_transcript/  
    """
    student_transcript = StudentCourse.objects.filter(user=request.user)
    serializer = StudentCourseSerializer(student_transcript, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_scheduled_courses(request):
    """api/student_courses/get_scheduled_courses
    """
    scheduled_ungraded_courses = StudentCourse.objects.filter(user=request.user).filter(credits_received=None)
    serializer = StudentCourseSerializer(scheduled_ungraded_courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_views_studentcourses(request, user_id):
    """api/student_courses/admin_views_studentcourses/<int:user_id>/  
    """
    view_studentcourses = StudentCourse.objects.filter(user_id=user_id)
    serializer = StudentCourseSerializer(view_studentcourses, many=True)
    return Response(serializer.data)

#Get all studentcourses that need grades

# GRADES
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_gpa(request):
    """api/users/grades/gpa 
    """
    gpa_received = StudentCourse.objects.filter(gpa__gte=0)
    serializer = StudentCourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def grade_course_object(request, course_id):
    """api/student_courses/grade_course_object/
    """   
    courses_to_grade = get_object_or_404(StudentCourse, pk=course_id)
    courses_to_grade.grade_received=request.data['grade_received']
    try:
        courses_to_grade.save()
        serializer = StudentCourseSerializer(courses_to_grade)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def grade_course_object(request, course_id):
    """api/student_courses/grade_course_object/
    """   
    existing_studentcourse = get_object_or_404(StudentCourse, pk=course_id)
    existing_studentcourse.grade_received=request.data['grade_received']
    if existing_studentcourse >=2:
            try:
                existing_studentcourse.save()
                serializer = StudentCourseSerializer(existing_studentcourse)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)


#COURSES

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_student_into_courses(request):
    """api/student_courses/enroll_student_into_courses/  
    """
    serializer = StudentCourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def calculate_credits_earned(request, user_id):
    credit_tally= StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=None)
    sum_of_credits = 0
    for credit in credit_tally:
        sum_of_credits += credit.credits_received
    return Response(sum_of_credits)


@api_view(['GET'])
def calculate_semester_by_credits(request, user_id):
    users_courses = StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=None)
    sum_of_credits = 0
    current_semester = 0
    for course in users_courses:
        sum_of_credits += course.credits_received
        current_semester=(sum_of_credits//16)+1
    return Response(current_semester)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def credits_for_passed_courses(request):
    """api/student_courses/credits_for_passed_courses/  ADD credits ONTO SCHEDULE
    """
    serializer = StudentCourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def calculate_gpa(request, user_id):
    graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received=None)
    sum_of_grades = 0
    for grade in graded_courses:
        sum_of_grades += grade.grade_received
    gpa= sum_of_grades/len(graded_courses)
    return Response(gpa)


    # if grade_received < 2:
    #     credits_received = 0
    # else:
    #     credits_received
    