<?php
$historyFile = 'history.txt';
$result = '';
$error = '';

// Обробка очищення історії
if (isset($_POST['clear_history'])) {
    if (file_exists($historyFile)) {
        file_put_contents($historyFile, '');
    }
}

// Обробка обчислень
if (isset($_POST['calculate'])) {
    $num1 = filter_input(INPUT_POST, 'num1', FILTER_VALIDATE_FLOAT);
    $num2 = filter_input(INPUT_POST, 'num2', FILTER_VALIDATE_FLOAT);
    $operation = $_POST['operation'] ?? '';

    if ($num1 === false || $num2 === false) {
        $error = 'Будь ласка, введіть коректні числові значення.';
    } else {
        switch ($operation) {
            case '+':
                $res = $num1 + $num2;
                break;
            case '-':
                $res = $num1 - $num2;
                break;
            case '*':
                $res = $num1 * $num2;
                break;
            case '/':
                if ($num2 == 0) {
                    $error = 'Помилка: Ділення на нуль неможливе!';
                } else {
                    $res = $num1 / $num2;
                }
                break;
            default:
                $error = 'Невідома операція.';
        }

        if (empty($error)) {
            $result = $res;
            $record = sprintf("[%s] %s %s %s = %s\n", date('Y-m-d H:i:s'), $num1, $operation, $num2, $res);
            // Запис операції у текстовий файл
            file_put_contents($historyFile, $record, FILE_APPEND | LOCK_EX);
        }
    }
}

// Читання історії з файлу
$history = [];
if (file_exists($historyFile)) {
    $lines = file($historyFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines !== false) {
        $history = array_reverse($lines); // Свіжі записи зверху
    }
}
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лабораторна робота №4 - Варіант 0</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <h1>Лабораторна робота №4: Основи PHP</h1>
        <h2>Варіант 0: Калькулятор з історією в текстовому файлі</h2>

        <div class="app-layout">
            <!-- Блок калькулятора -->
            <section class="card calculator-card">
                <h3>Калькулятор</h3>

                <?php if (!empty($error)): ?>
                    <div class="alert error"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>

                <?php if ($result !== ''): ?>
                    <div class="alert success">Результат: <b><?= htmlspecialchars((string)$result) ?></b></div>
                <?php endif; ?>

                <form method="POST" action="">
                    <div class="input-group">
                        <label for="num1">Перше число:</label>
                        <input type="number" step="any" id="num1" name="num1" required value="<?= isset($_POST['num1']) ? htmlspecialchars((string)$_POST['num1']) : '' ?>">
                    </div>

                    <div class="input-group">
                        <label for="operation">Операція:</label>
                        <select id="operation" name="operation" required>
                            <option value="+" <?= (isset($_POST['operation']) && $_POST['operation'] === '+') ? 'selected' : '' ?>>+ (Додавання)</option>
                            <option value="-" <?= (isset($_POST['operation']) && $_POST['operation'] === '-') ? 'selected' : '' ?>>- (Віднімання)</option>
                            <option value="*" <?= (isset($_POST['operation']) && $_POST['operation'] === '*') ? 'selected' : '' ?>>* (Множення)</option>
                            <option value="/" <?= (isset($_POST['operation']) && $_POST['operation'] === '/') ? 'selected' : '' ?>>/ (Ділення)</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <label for="num2">Друге число:</label>
                        <input type="number" step="any" id="num2" name="num2" required value="<?= isset($_POST['num2']) ? htmlspecialchars((string)$_POST['num2']) : '' ?>">
                    </div>

                    <button type="submit" name="calculate" class="btn primary-btn">Обчислити</button>
                </form>
            </section>

            <!-- Блок історії -->
            <section class="card history-card">
                <div class="history-header">
                    <h3>Історія обчислень</h3>
                    <?php if (!empty($history)): ?>
                        <form method="POST" action="" style="display:inline;">
                            <button type="submit" name="clear_history" class="btn danger-btn">Очистити</button>
                        </form>
                    <?php endif; ?>
                </div>

                <div class="history-list">
                    <?php if (empty($history)): ?>
                        <p class="empty-msg">Історія порожня. Виконайте перше обчислення.</p>
                    <?php else: ?>
                        <ul>
                            <?php foreach ($history as $item): ?>
                                <li><?= htmlspecialchars($item) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </section>
        </div>
    </div>

</body>
</html>