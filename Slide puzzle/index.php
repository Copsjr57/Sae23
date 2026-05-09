<?php
// génère un nom de fichier pour l'image uploadée
  $imageUploadee="photo.jpg";
  if (isset($_FILES["image"]) && $_FILES["image"]["error"]==0){
    $nomFichier=$_FILES["image"]["name"];
    $extension=strtolower(pathinfo($nomFichier,PATHINFO_EXTENSION));
    
    // verifier que l'extension est valide (jpg,jpeg,png)
    if ($extension=="jpg" || $extension=="jpeg" || $extension=="png") {
      //
      move_uploaded_file($_FILES["image"]["tmp_name"],"photo.jpg");
      $imageUploadee="photo.jpg";
    }
  }
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Slide Puzzle</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Slide Puzzle</h1>
  
  <!-- Formulaire pour uploader une image -->
  <form method="post" enctype="multipart/form-data">
    <input type="file" name="image" accept="image/jpeg, image/png">
    <input type="submit" value="Charger l'image">
  </form>
  <!-- Interface du jeu de puzzle -->
  <div id="puzzle"></div>
  <p>Déplacements: <span id="moves">0</span></p> 
  <button onclick="melanger()">Mélanger</button>
  <button onclick="changerMode()">Mode Image</button>
  <script>
    // mélange les cases du puzzle et ajoute une case vide
    var cases=<?php
      $tableau=array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
      $tableau[]=null;
      shuffle($tableau);
      echo json_encode($tableau); 
    ?>;
    
    // stocke le nom de l'image uploadée pour l'utiliser dans le script JavaScript
    var imageUploadee="<?php echo $imageUploadee;?>";
  </script>
  <script src="script.js"></script>
</body>
</html>
