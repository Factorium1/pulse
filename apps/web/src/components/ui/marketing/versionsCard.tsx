import Link from 'next/link'
import showVersions from './showVersions'

export const VersionsCard = (os: string) => {
  return (
    <>
      {os === 'windows' && (
        <div className="flex-center flex-col">
          <div className="card pt-5 flex items-start justify-center flex-col border-b-2 border-gray-200 pb-5 px-6 gap-1 rounded-t-lg bg-card shadow-md w-full max-w-md">
            <p className="font-semibold text-xl">Verwende die website</p>
            <p className="text-light text-sm text-slate-500">
              Fuer Windows/MacOS/Linux verwende die Web-App
            </p>
          </div>
          <div className="card flex flex-col items-start justify-center gap-4 px-6 pb-6 pt-5 rounded-b-lg bg-card shadow-md w-full max-w-md">
            <div className="flex-center flex-col w-full gap-3">
              <Link
                href="/"
                className="bg-slate-200 py-4 pl-5 rounded-md w-full font-medium text-foreground cursor-pointer text-sm shadow-md"
              >
                Web-App öffnen
              </Link>
              <p className="text-xs text-slate-500 font-normal">
                Tipp: Fuer unterwegs, oder wenn du kein Smartphone hast
              </p>
            </div>
          </div>
        </div>
      )}
      {os !== 'windows' && (
        <div className="flex-center flex-col">
          <div className="card pt-5 flex items-start justify-center flex-col border-b-2 border-gray-200 pb-5 px-6 gap-1 rounded-t-lg bg-card shadow-md w-full max-w-md">
            <p className="font-semibold text-xl">Waehle eine Version</p>
            <p className="text-light text-sm text-slate-500">
              Fuer iOS verfuegbare Builds anzeigen
            </p>
          </div>
          <div className="card flex flex-col items-start justify-center gap-4 px-6 pb-6 pt-5 rounded-b-lg bg-card shadow-md w-full max-w-md">
            <div className="flex-center flex-col w-full gap-3">
              <select
                name="version"
                id="version"
                className="bg-slate-200 py-4 pl-5 rounded-md w-full font-medium text-foreground cursor-pointer text-sm shadow-md"
              >
                {/* {showVersions(os)} */}
                <option value="ios">iOS Aktuelle Version</option>
                <option value="ios-beta">iOS Beta Version</option>
                <option value="android">Android Aktuelle Version</option>
                <option value="android-beta">Android Beta Version</option>
              </select>
              <p className="text-xs text-slate-500 font-normal">
                Tipp: Wechsle zwischen Stable und Beta, um andere Builds zu sehen
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
