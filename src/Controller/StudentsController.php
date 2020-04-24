<?php
namespace App\Controller;

use App\Entity\Student;
use App\Repository\StudentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\{JsonResponse,Request};
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bunlde\FrameworkExtraBundle\Configuration\Method;

class StudentsController extends ApiController
{
    /**
     * @Route("/students", methods="GET")
     */
    public function index(StudentRepository $studentRepository)
    {
        $students = $studentRepository->transformAll();

        return $this->respond($students);
    }

    /**
     * @Route("/students/{id}", methods="GET")
     */
    public function read($id, StudentRepository $studentRepository)
    {
        $student = $studentRepository->find($id);

        if (! $student) {
            return $this->respondNotFound();
        }

        return $this->respond($studentRepository->transform($student));
    }

    /**
    * @Route("/students/", methods="POST")
    */
    public function create(Request $request, StudentRepository $studentRepository, EntityManagerInterface $em)
    {
        $request = $this->transformJsonBody($request);

        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }
        // persist the new student
        $student = new Student;
        $student->setFirstName($request->get('first_name'));
        $student->setLastName($request->get('last_name'));
        $student->setPhotoUrl($request->get('photo_url'));
        $student->setBirthdate(\DateTime::createFromFormat('Y-m-d', $request->get('birthdate')));
        $em->persist($student);
        $em->flush();

        return $this->respondCreated($studentRepository->transform($student));
    }

    
    /**
    * @Route("/students/{id}", methods="POST")
    */
    public function edit($id, Request $request, StudentRepository $studentRepository, EntityManagerInterface $em)
    {
        $request = $this->transformJsonBody($request);

        $student = $studentRepository->find($id);

        if (! $student) {
            return $this->respondNotFound();
        }
        // persist the new student
        $student->setFirstName($request->get('first_name'));
        $student->setLastName($request->get('last_name'));
        $student->setPhotoUrl($request->get('photo_url'));
        $student->setBirthdate(\DateTime::createFromFormat('Y-m-d', $request->get('birthdate')));
        $em->persist($student);
        $em->flush();

        return $this->respond($studentRepository->transform($student));
    }

}