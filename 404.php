<?php
http_response_code(404);
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 — Сторінку не знайдено</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .error-container {
            max-width: 600px;
            margin: 80px auto;
            text-align: center;
            background: #1e1e1e;
            padding: 40px;
            border-radius: 8px;
            border: 1px solid #333;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            color: #e0e0e0;
        }
        .error-code {
            font-size: 72px;
            font-weight: bold;
            color: #ff5252;
            margin-bottom: 10px;
        }
        .error-msg {
            font-size: 18px;
            margin-bottom: 25px;
            color: #aaa;
        }
        .btn-home {
            display: inline-block;
            padding: 10px 24px;
            background-color: #007acc;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            transition: background-color 0.2s;
        }
        .btn-home:hover {
            background-color: #005999;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-code">404</div>
        <h2>Сторінку не знайдено</h2>
        <p class="error-msg">Запитаний ресурс не існує або був переміщений.</p>
        <a href="index.php" class="btn-home">Повернутися до калькулятора</a>
    </div>
</body>
</html>