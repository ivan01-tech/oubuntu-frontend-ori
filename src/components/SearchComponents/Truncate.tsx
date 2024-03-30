import { MdCheck, MdContentCopy } from "react-icons/md";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const TruncatedLink: React.FC<{ url: string; maxLength: number }> = ({
  url,
  maxLength,
}) => {
  const [copied, setCopied] = useState(false);

  // Fonction pour copier le lien dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Réinitialise le statut "copied" après 3 secondes
    });
  };

  // Fonction pour tronquer le lien si nécessaire
  const truncateUrl = (url: string, maxLength: number) => {
    return url.length > maxLength ? url.slice(0, maxLength) + "..." : url;
  };

  return (
    <div className="flex">
      {/* Affiche le lien tronqué */}
      <Input value={truncateUrl(url, maxLength)} className="border-none" />
      {/* Affiche le bouton de copie si le lien est tronqué */}
      {url.length > maxLength && (
        <button className="p-2 py-2 bg-none" onClick={copyToClipboard}>
          {copied ? <MdCheck /> : <MdContentCopy />}
        </button>
      )}
    </div>
  );
};

export default TruncatedLink;
