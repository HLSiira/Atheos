<?php

//////////////////////////////////////////////////////////////////////////////80
// Filmanager Dialog
//////////////////////////////////////////////////////////////////////////////80
// Copyright (c) Atheos & Liam Siira (Atheos.io), distributed as-is and without
// warranty under the modified License: MIT - Hippocratic 1.2: firstdonoharm.dev
// See [root]/license.md for more. This information must remain intact.
//////////////////////////////////////////////////////////////////////////////80
// Authors: Codiad Team, @Fluidbyte, Atheos Team, @hlsiira
//////////////////////////////////////////////////////////////////////////////80

$path = Common::data("path");

switch ($action) {

	//////////////////////////////////////////////////////////////////////////80
	// Upload
	//////////////////////////////////////////////////////////////////////////80
	case 'upload':
		if (!Common::isAbsPath($path)) {
			$path .= "/";
		}
		?>
		<label class="title"><i class="fas fa-upload"></i><?php echo i18n("filesUpload"); ?></label>
		<form enctype="multipart/form-data">
			<pre><?php echo($path); ?></pre>
			<label id="upload_wrapper">
				<?php echo i18n("dragFilesOrClickHereToUpload"); ?>
				<input type="file" name="upload[]" multiple>
			</label>
			<div id="progress_wrapper">
			</div>
		</form>

		<?php
		break;

	//////////////////////////////////////////////////////////////////////////80
	// Default: Invalid Action
	//////////////////////////////////////////////////////////////////////////80
	default:
		Common::sendJSON("E401i");
		break;
}