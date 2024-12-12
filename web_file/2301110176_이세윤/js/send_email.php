<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "lsy200400@naver.com"; // 여기에 귀하의 이메일 주소를 입력하세요
    $subject = "새로운 포트폴리오 문의";
    
    $body = "이름: $name\n";
    $body .= "이메일: $email\n\n";
    $body .= "메시지:\n$message";
    
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('메시지가 성공적으로 전송되었습니다.'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('메시지 전송에 실패했습니다. 다시 시도해 주세요.'); window.location.href='index.html';</script>";
    }
}
?>
