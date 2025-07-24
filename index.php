<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Pointage de Présence – Centre de Recherche UPN</title>
  <link rel="icon" href="onip.png" />
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <style>
    body {
      font-family: 'Chakra Petch', sans-serif;
      background: linear-gradient(135deg, #f0f4ff, #d6e4ff);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }
    .container-box {
      background-color: white;
      border-radius: 15px;
      padding: 40px 30px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
      max-width: 500px;
      width: 100%;
      text-align: center;
      border-top: 10px solid #fcd116;
      border-bottom: 10px solid #007fff;
    }
    .logo {
      width: 100px;
      margin-bottom: 20px;
    }
    h1 {
      color: #007fff;
      font-size: 24px;
    }
    h2 {
      color: #e70013;
      font-size: 18px;
      margin-bottom: 30px;
    }
    .btn-pointage {
      padding: 12px 25px;
      font-size: 16px;
    }
    #message {
      display: none;
      margin-top: 20px;
    }
    #position-actuelle {
      margin-top: 10px;
      font-size: 0.9em;
      color: #555;
    }
    #distance-actuelle {
      margin-top: 5px;
      font-size: 0.9em;
      color: #666;
    }
  </style>
  <script src="presence.js" defer></script>
</head>
<body>

  <div class="container-box">
    <img src="onip.png" alt="Logo Centre de Recherche UPN" class="logo" />
    <h1>Centre de Recherche – UPN</h1>
    <h2>Pointage de Présence</h2>

    <button class="btn btn-primary btn-pointage" onclick="verifierPresence()">✅ Pointer ma présence</button>

    <div id="message" role="alert" class="alert"></div>
    <div id="position-actuelle"></div>
    <div id="distance-actuelle"></div>
  </div>

</body>
</html>
