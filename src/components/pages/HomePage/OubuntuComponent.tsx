/* eslint-disable react/no-unescaped-entities */
import CustomImage from "@/components/ui/image";
import React from "react";

const OubuntuComponent = () => {
  return (
    <div className=" lg:p-8 p-4 flex flex-col  space-y-8">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 pb-8">
        <div className="flex space-x-4">
          <CustomImage
            path="/images/icon1.png"
            className="w-16 h-16 object-contain "
          />
          <div className="flex flex-col space-y-2">
            <p className="lg:text-2xl text-primary font-bold">
              {" "}
              Achetez en groupe{" "}
            </p>
            <p className="lg:text-md text-sm opacity-75">
              {" "}
              Achetez en groupe afin d'obtenir des réductions intéressantes,
              invitez vos proches afin qu'ils en profite aussi
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <CustomImage
            path="/images/icon2.png"
            className="w-16 h-16 object-contain"
          />
          <div className="flex flex-col space-y-2">
            <p className="lg:text-2xl text-primary font-bold">
              {" "}
              Achetez en groupe{" "}
            </p>
            <p className="lg:text-md text-sm opacity-75">
              {" "}
              Achetez en groupe afin d'obtenir des réductions intéressantes,
              invitez vos proches afin qu'ils en profite aussi
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <CustomImage
            path="/images/icon3.png"
            className="w-16 h-16 object-contain"
          />
          <div className="flex flex-col space-y-2">
            <p className="lg:text-2xl text-primary font-bold">
              {" "}
              Achetez en groupe{" "}
            </p>
            <p className="lg:text-md text-sm opacity-75">
              {" "}
              Achetez en groupe afin d'obtenir des réductions intéressantes,
              invitez vos proches afin qu'ils en profite aussi
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        Oubuntu - Votre Destination de Shopping en Ligne au Cameroun
      </h1>
      <p className="text-sm mb-4">
        Oubuntu est l'un des sites de vente en ligne au Cameroun qui connaît une
        croissance rapide et a pour objectif de faciliter toutes les
        transactions en ligne pour la population camerounaise. Il offre une
        plateforme pour rendre l'achat de divers produits plus facile et plus
        efficace, tant pour les acheteurs que pour les vendeurs. Les vendeurs
        peuvent rejoindre la communauté spécifique des vendeurs Oubuntu pour
        démarrer ou étendre leur entreprise. Le processus d'inscription en tant
        que vendeur Oubuntu est simple, il vous suffit de fournir vos
        coordonnées, le nom de votre magasin et l'adresse de votre magasin pour
        être immédiatement enregistré en tant que vendeur Oubuntu. Vous pouvez
        également améliorer votre compte vendeur pour devenir un Power Merchant,
        atteignant ainsi un public Oubuntu encore plus large, ce qui peut
        stimuler davantage votre entreprise en ligne. Les avantages du statut
        Power Merchant incluent la possibilité d'offrir la livraison gratuite,
        d'utiliser la fonction TopAds pour atteindre un plus grand nombre
        d'utilisateurs Oubuntu avec un investissement minimal à partir de 25 000
        XAF, et d'améliorer l'attrait de votre magasin pour renforcer la
        confiance des acheteurs.
      </p>
      <p className="text-sm mb-4">
        Oubuntu propose une gamme diversifiée de produits, en faisant un choix
        de marché pour de nombreux Camerounais. En plus de rendre l'expérience
        d'achat en ligne plus facile, sécurisée et efficace, Oubuntu propose
        diverses fonctionnalités et méthodes de paiement pour garantir la
        commodité de vos achats. Les options de paiement vont des virements
        bancaires avec différentes banques disponibles, aux portefeuilles
        électroniques tels que OVO, en passant par les versements. Le système
        d'achat sur Oubuntu est également intégré avec plusieurs services de
        livraison, offrant la possibilité de livraison gratuite et permettant
        aux utilisateurs de suivre en temps réel le statut de livraison de leurs
        produits achetés. Oubuntu couvre une variété de produits, allant des
        vêtements pour bébés, accessoires de voiture, accessoires d'appareils
        photo, pantalons, montres, jusqu'aux équipements électroniques tels que
        les câbles et les équipements de jeu, ou même de la nourriture.
      </p>
      <p className="text-sm">
        Oubuntu propose également des magasins officiels pour des marques
        spécifiques, garantissant la qualité des produits et offrant une
        garantie officielle de 7 jours. Ces magasins officiels couvrent une
        gamme variée de produits, des vêtements aux accessoires de mode, des
        sacs aux chaussures, des smartphones aux produits électroniques, et même
        des véhicules motorisés et leurs pièces. Les utilisateurs peuvent
        profiter de nombreuses offres, notamment des remises, des cashbacks, et
        la possibilité de suivre des marques spécifiques pour des offres
        exclusives.
      </p>
      <p className="text-sm">
        Oubuntu met l'accent sur la transparence, la confiance et la commodité
        pour offrir une expérience d'achat en ligne complète et sécurisée à sa
        clientèle camerounaise.
      </p>
    </div>
  );
};

export default OubuntuComponent;
