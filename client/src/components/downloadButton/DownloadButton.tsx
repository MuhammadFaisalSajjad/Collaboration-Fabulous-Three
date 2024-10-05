import React from "react";
import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

const DownloadButton = (): React.JSX.Element => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";  
    link.download = "Faisal_Resume.pdf";  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      style={{ backgroundColor: '#A3CB38', color: 'white' }}
      radius="md" 
      size="md" 
      className="hover:bg-green-700 mb-4" 
    >
      <IconDownload size={18} style={{ marginRight: 8 }} />
      Download Resume
    </Button>
  );
};

export default DownloadButton;
