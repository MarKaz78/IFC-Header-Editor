
export const translations = {
  pl: {
    // metadata & title
    app_title: "Edytor opisów IFC",
    app_description: "Aplikacja webowa do przesyłania plików IFC, przeglądania i edycji właściwości 'Description' oraz pobierania zmodyfikowanego pliku. Narzędzie to zapewnia prosty interfejs do szybkiej aktualizacji metadanych IFC bez konieczności używania złożonego oprogramowania BIM.",
    
    // Header
    header_title: "Edytor nagłówka IFC",
    header_subtitle: "Prześlij plik IFC, edytuj pola 'Description' w nagłówku pliku i natychmiast pobierz zaktualizowaną wersję.",
    header_info_button_aria: "O aplikacji",

    // Footer
    footer_created_by: "Stworzone przez",
    footer_rights_reserved: "Wszelkie prawa zastrzeżone.",
    
    // FileUpload
    file_upload_loading: "Przetwarzanie pliku IFC...",
    file_upload_cta_click: "Kliknij, aby przesłać",
    file_upload_cta_drag: "lub przeciągnij i upuść",
    file_upload_file_type: "Plik IFC (.ifc)",
    
    // Main App View
    main_view_title: "Edycja opisów w nagłówku",
    main_view_file: "Plik",
    button_download: "Pobierz zmodyfikowany IFC",
    button_new_file: "Wczytaj nowy plik",
    button_import_excel: "Importuj z excela",
    button_export_excel: "Eksportuj zaznaczone do excela",
    button_add_value: "Dodaj nową wartość",
    
    // PropertyEditor Table
    table_header_index: "Indeks",
    table_header_current_desc: "Aktualny opis",
    table_header_new_desc: "Nowy opis",
    table_header_actions: "Akcje",
    table_empty_cell: "pusty",
    table_new_desc_placeholder: "Wprowadź nowy opis",
    table_aria_select_all: "Zaznacz wszystkie opisy",
    table_aria_select_row: "Zaznacz opis dla indeksu",
    table_aria_delete_row: "Usuń opis dla indeksu",
    table_delete_tooltip: "Usuń opis",
    
    // No descriptions found view
    no_descriptions_found: "Nie znaleziono wpisów 'Description' w nagłówku pliku.",
    button_add_first_desc: "Dodaj pierwszy opis",
    
    // Info Modal
    modal_title: "O edytorze nagłówka IFC",
    modal_close_aria: "Zamknij okno",
    modal_p1: "To narzędzie pozwala na szybkie przeglądanie i edycję właściwości 'Description' w nagłówku pliku IFC. Jest przeznaczone do prostych aktualizacji metadanych bez potrzeby korzystania ze skomplikowanego oprogramowania BIM.",
    modal_how_it_works: "Jak to działa",
    modal_step1: "Prześlij: Wybierz lub przeciągnij i upuść plik .ifc. Aplikacja odczytuje plik bezpośrednio w Twojej przeglądarce.",
    modal_step2: "Edytuj: Aplikacja analizuje blok FILE_DESCRIPTION i wyświetla wszystkie wpisy. Możesz modyfikować istniejące wartości, dodawać nowe lub usuwać wpisy.",
    modal_step3: "Pobierz: Po zakończeniu edycji kliknij przycisk pobierania, aby otrzymać nowy plik .ifc z wprowadzonymi zmianami.",
    modal_privacy_title: "Prywatność i bezpieczeństwo",
    modal_privacy_p1: "Twoja prywatność jest najważniejsza. Całe przetwarzanie plików odbywa się w całości na Twoim komputerze, w przeglądarce internetowej. Twoje pliki nigdy nie są przesyłane na żaden serwer.",

    // Errors
    error_file_empty: "Plik jest pusty lub nie można go odczytać.",
    error_unknown: "Wystąpił nieznany błąd.",
    error_processing_file: "Wystąpił nieznany błąd podczas przetwarzania pliku.",
    error_reading_file: "Nie udało się odczytać pliku.",
    error_generating_file: "Nie udało się wygenerować zaktualizowanego pliku.",
    error_importing_file: "Wystąpił nieznany błąd podczas importu.",
    error_excel_export: "Eksport danych do pliku excel nie powiódł się.",
    error_excel_read: "Nie można odczytać pliku excel.",
    error_excel_format: "Nieprawidłowy format pliku excel. Upewnij się, że istnieją kolumny 'Index' oraz 'Description'.",
    error_excel_row_data: "Nieprawidłowe dane w wierszu {row}. 'Index' musi być liczbą, a 'Description' musi istnieć.",
    error_excel_processing: "Przetwarzanie pliku excel nie powiodło się.",
  },
  en: {
    // metadata & title
    app_title: "IFC description editor",
    app_description: "A web application to upload IFC files, view and edit 'Description' properties, and download the modified file. This tool provides a simple interface for quickly updating IFC metadata without the need for complex BIM software.",
    
    // Header
    header_title: "IFC header editor",
    header_subtitle: "Upload an IFC file, edit the 'Description' fields in the file header, and instantly download the updated version.",
    header_info_button_aria: "About the application",

    // Footer
    footer_created_by: "Created by",
    footer_rights_reserved: "All rights reserved.",
    
    // FileUpload
    file_upload_loading: "Processing IFC file...",
    file_upload_cta_click: "Click to upload",
    file_upload_cta_drag: "or drag and drop",
    file_upload_file_type: "IFC file (.ifc)",
    
    // Main App View
    main_view_title: "Editing header descriptions",
    main_view_file: "File",
    button_download: "Download modified IFC",
    button_new_file: "Load new file",
    button_import_excel: "Import from excel",
    button_export_excel: "Export selected to excel",
    button_add_value: "Add new value",
    
    // PropertyEditor Table
    table_header_index: "Index",
    table_header_current_desc: "Current description",
    table_header_new_desc: "New description",
    table_header_actions: "Actions",
    table_empty_cell: "empty",
    table_new_desc_placeholder: "Enter new description",
    table_aria_select_all: "Select all descriptions",
    table_aria_select_row: "Select description for index",
    table_aria_delete_row: "Delete description for index",
    table_delete_tooltip: "Delete description",
    
    // No descriptions found view
    no_descriptions_found: "No 'Description' entries found in the file header.",
    button_add_first_desc: "Add first description",

    // Info Modal
    modal_title: "About IFC header editor",
    modal_close_aria: "Close window",
    modal_p1: "This tool allows you to quickly view and edit the 'Description' properties within the header of an IFC file. It is designed for simple metadata updates without needing complex BIM software.",
    modal_how_it_works: "How it works",
    modal_step1: "Upload: Select or drag and drop an .ifc file. The application reads the file directly in your browser.",
    modal_step2: "Edit: The application parses the FILE_DESCRIPTION block and displays all entries. You can modify existing values, add new ones, or delete entries.",
    modal_step3: "Download: Once you finish editing, click the download button to get a new .ifc file with your changes.",
    modal_privacy_title: "Privacy and security",
    modal_privacy_p1: "Your privacy is paramount. All file processing is done entirely on your computer, within your web browser. Your files are never uploaded to any server.",

    // Errors
    error_file_empty: "The file is empty or cannot be read.",
    error_unknown: "An unknown error occurred.",
    error_processing_file: "An unknown error occurred while processing the file.",
    error_reading_file: "Failed to read the file.",
    error_generating_file: "Failed to generate the updated file.",
    error_importing_file: "An unknown error occurred during import.",
    error_excel_export: "Failed to export data to excel file.",
    error_excel_read: "Could not read the excel file.",
    error_excel_format: "Invalid excel file format. Make sure the columns 'Index' and 'Description' exist.",
    error_excel_row_data: "Invalid data in row {row}. 'Index' must be a number and 'Description' must exist.",
    error_excel_processing: "Failed to process the excel file.",
  },
  es: {
    // metadata & title
    app_title: "Editor de descripciones IFC",
    app_description: "Una aplicación web para cargar archivos IFC, ver y editar propiedades de 'Descripción', y descargar el archivo modificado. Esta herramienta proporciona una interfaz simple para actualizar rápidamente los metadatos de IFC sin la necesidad de un software BIM complejo.",
    
    // Header
    header_title: "Editor de cabecera IFC",
    header_subtitle: "Sube un archivo IFC, edita los campos de 'Descripción' en la cabecera del archivo y descarga instantáneamente la versión actualizada.",
    header_info_button_aria: "Sobre la aplicación",

    // Footer
    footer_created_by: "Creado por",
    footer_rights_reserved: "Todos los derechos reservados.",
    
    // FileUpload
    file_upload_loading: "Procesando archivo IFC...",
    file_upload_cta_click: "Haz clic para subir",
    file_upload_cta_drag: "o arrastra y suelta",
    file_upload_file_type: "Archivo IFC (.ifc)",
    
    // Main App View
    main_view_title: "Editando descripciones de cabecera",
    main_view_file: "Archivo",
    button_download: "Descargar IFC modificado",
    button_new_file: "Cargar nuevo archivo",
    button_import_excel: "Importar desde excel",
    button_export_excel: "Exportar selección a excel",
    button_add_value: "Añadir nuevo valor",
    
    // PropertyEditor Table
    table_header_index: "Índice",
    table_header_current_desc: "Descripción actual",
    table_header_new_desc: "Nueva descripción",
    table_header_actions: "Acciones",
    table_empty_cell: "vacío",
    table_new_desc_placeholder: "Introduce la nueva descripción",
    table_aria_select_all: "Seleccionar todas las descripciones",
    table_aria_select_row: "Seleccionar descripción para el índice",
    table_aria_delete_row: "Eliminar descripción para el índice",
    table_delete_tooltip: "Eliminar descripción",
    
    // No descriptions found view
    no_descriptions_found: "No se encontraron entradas de 'Descripción' en la cabecera del archivo.",
    button_add_first_desc: "Añadir primera descripción",

    // Info Modal
    modal_title: "Sobre el editor de cabecera IFC",
    modal_close_aria: "Cerrar ventana",
    modal_p1: "Esta herramienta te permite ver y editar rápidamente las propiedades de 'Descripción' dentro de la cabecera de un archivo IFC. Está diseñada para actualizaciones simples de metadatos sin necesidad de un software BIM complejo.",
    modal_how_it_works: "Cómo funciona",
    modal_step1: "Subir: Selecciona o arrastra y suelta un archivo .ifc. La aplicación lee el archivo directamente en tu navegador.",
    modal_step2: "Editar: La aplicación analiza el bloque FILE_DESCRIPTION y muestra todas las entradas. Puedes modificar los valores existentes, añadir nuevos o eliminar entradas.",
    modal_step3: "Descargar: Una vez que termines de editar, haz clic en el botón de descarga para obtener un nuevo archivo .ifc con tus cambios.",
    modal_privacy_title: "Privacidad y seguridad",
    modal_privacy_p1: "Tu privacidad es primordial. Todo el procesamiento de archivos se realiza completamente en tu ordenador, dentro de tu navegador web. Tus archivos nunca se suben a ningún servidor.",

    // Errors
    error_file_empty: "El archivo está vacío o no se puede leer.",
    error_unknown: "Ocurrió un error desconocido.",
    error_processing_file: "Ocurrió un error desconocido al procesar el archivo.",
    error_reading_file: "No se pudo leer el archivo.",
    error_generating_file: "No se pudo generar el archivo actualizado.",
    error_importing_file: "Ocurrió un error desconocido durante la importación.",
    error_excel_export: "No se pudieron exportar los datos al archivo excel.",
    error_excel_read: "No se pudo leer el archivo excel.",
    error_excel_format: "Formato de archivo excel no válido. Asegúrate de que existan las columnas 'Index' y 'Description'.",
    error_excel_row_data: "Datos no válidos en la fila {row}. 'Index' debe ser un número y 'Description' debe existir.",
    error_excel_processing: "No se pudo procesar el archivo excel.",
  }
};

export type Translation = typeof translations.pl;
