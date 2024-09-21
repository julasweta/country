-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name_common" TEXT NOT NULL,
    "name_official" TEXT NOT NULL,
    "native_name_eng" TEXT,
    "tld" JSONB,
    "cca2" TEXT,
    "ccn3" TEXT,
    "cca3" TEXT,
    "independent" BOOLEAN,
    "status" TEXT,
    "un_member" BOOLEAN,
    "currencies" JSONB,
    "idd_root" TEXT,
    "idd_suffixes" JSONB,
    "capital" JSONB,
    "alt_spellings" JSONB,
    "region" TEXT NOT NULL,
    "languages" JSONB,
    "latlng" JSONB,
    "landlocked" BOOLEAN,
    "area" DOUBLE PRECISION NOT NULL,
    "demonyms" JSONB,
    "flag" TEXT NOT NULL,
    "maps" JSONB,
    "population" INTEGER NOT NULL,
    "car_signs" JSONB,
    "car_side" TEXT,
    "timezones" JSONB,
    "continents" JSONB,
    "flags_png" TEXT,
    "flags_svg" TEXT,
    "coat_of_arms" JSONB,
    "start_of_week" TEXT,
    "capital_info_latlng" JSONB,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    "country_name" JSONB NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
