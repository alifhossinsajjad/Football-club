"use client";

interface Props {
  profile: any;
  onEdit: () => void;
}

const SkillBar = ({ label, value }: { label: string; value: number }) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}
  >
    <span style={{ fontSize: 12, color: "#9BA3C8", width: 72, flexShrink: 0 }}>
      {label}
    </span>
    <div
      style={{
        flex: 1,
        height: 6,
        background: "#1E2554",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          background: "linear-gradient(90deg, #B026FF, #00E5FF)",
          borderRadius: 4,
        }}
      />
    </div>
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: "#00E5FF",
        width: 28,
        textAlign: "right",
      }}
    >
      {value}
    </span>
  </div>
);

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div
    style={{
      background: "#0D1235",
      borderRadius: 10,
      padding: "16px 12px",
      textAlign: "center",
      border: "1px solid #1E2554",
    }}
  >
    <div
      style={{
        fontSize: 28,
        fontWeight: 800,
        background: "linear-gradient(135deg, #00E5FF, #B026FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: 11,
        color: "#6B74A8",
        marginTop: 4,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  </div>
);

export default function ProfileView({ profile, onEdit }: Props) {
    console.log("profile log dichi",profile)
  if (!profile) return null;

  const fmt = (d?: string) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-GB");
  };

  const handle = (url?: string) =>
    url?.replace(/\/$/, "").split("/").pop() ?? "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@600;700;800&display=swap');
        .pv-wrap * { box-sizing: border-box; }
        .pv-wrap { font-family: 'Barlow', sans-serif; background: #080D28; min-height: 100vh; padding: 20px; color: #fff; }
        .pv-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 280px; gap: 16px; }
        .pv-left { display: flex; flex-direction: column; gap: 16px; }
        .pv-right { display: flex; flex-direction: column; gap: 16px; }
        .card { background: #11163C; border-radius: 12px; overflow: hidden; }
        .card-body { padding: 20px; }
        .card-title { font-size: 15px; font-weight: 700; margin-bottom: 14px; letter-spacing: 0.3px; }
        .cover { height: 160px; background-size: cover; background-position: center; }
        .hero-body { padding: 0 20px 20px; }
        .avatar-row { display: flex; align-items: flex-end; gap: 14px; margin-top: -44px; margin-bottom: 12px; }
        .avatar { width: 88px; height: 88px; border-radius: 50%; border: 3px solid #11163C; object-fit: cover; position: relative; z-index: 1; flex-shrink: 0; }
        .avatar-fb { width: 88px; height: 88px; border-radius: 50%; border: 3px solid #11163C; background: linear-gradient(135deg, #B026FF, #00E5FF); display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 800; flex-shrink: 0; z-index: 1; }
        .hero-name { font-size: 20px; font-weight: 800; font-family: 'Barlow Condensed', sans-serif; }
        .hero-desig { font-size: 13px; color: #8B93C4; margin-top: 2px; }
        .hero-loc { font-size: 12px; color: #6B74A8; margin-top: 3px; }
        .badge-avail { background: rgba(0,229,100,0.15); border: 1px solid #00E564; color: #00E564; border-radius: 6px; font-size: 11px; font-weight: 700; padding: 4px 10px; }
        .btn-edit { background: linear-gradient(135deg, #B026FF, #00BCD4); border: none; border-radius: 8px; color: #fff; font-size: 13px; font-weight: 600; padding: 8px 16px; cursor: pointer; font-family: 'Barlow', sans-serif; white-space: nowrap; }
        .stats-strip { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: #1E2554; }
        .sstat { background: #11163C; padding: 12px 8px; display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .sstat-val { font-size: 14px; font-weight: 700; font-family: 'Barlow Condensed', sans-serif; }
        .sstat-lbl { font-size: 10px; color: #6B74A8; text-transform: uppercase; text-align: center; }
        .career-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .hist-item { position: relative; padding-left: 20px; padding-bottom: 18px; }
        .hist-item::before { content: ''; position: absolute; left: 6px; top: 14px; bottom: -4px; width: 2px; background: #1E2554; }
        .hist-item:last-child::before { display: none; }
        .hist-dot { position: absolute; left: 0; top: 6px; width: 14px; height: 14px; border-radius: 50%; background: linear-gradient(135deg, #B026FF, #00E5FF); border: 2px solid #11163C; }
        .hist-club { font-size: 14px; font-weight: 700; }
        .hist-period { font-size: 11px; color: #00E5FF; font-weight: 600; background: rgba(0,229,255,0.08); padding: 2px 8px; border-radius: 4px; }
        .hist-pos { font-size: 12px; color: #6B74A8; margin-top: 2px; }
        .hist-ach { font-size: 11px; color: #6B74A8; margin-top: 4px; }
        .videos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .video-card { border-radius: 8px; overflow: hidden; background: #0D1235; border: 1px solid #1E2554; }
        .video-thumb { height: 100px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0d1235, #1a0a2e); }
        .play-btn { width: 36px; height: 36px; background: rgba(0,229,255,0.15); border: 2px solid #00E5FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .video-info { padding: 8px 10px; }
        .video-ttl { font-size: 11px; font-weight: 600; }
        .video-sub { font-size: 10px; color: #6B74A8; margin-top: 2px; }
        .contact-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .c-icon { width: 28px; height: 28px; border-radius: 6px; background: #0D1235; border: 1px solid #1E2554; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 13px; }
        .c-text { font-size: 12px; color: #9BA3C8; }
        .social-item { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .s-icon { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .s-hdl { font-size: 12px; color: #9BA3C8; }
        .ach-item { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 10px; }
        .ach-dot { width: 6px; height: 6px; border-radius: 50%; background: #00E5FF; margin-top: 5px; flex-shrink: 0; }
        .ach-ttl { font-size: 12px; color: #fff; font-weight: 500; }
        .ach-date { font-size: 10px; color: #6B74A8; margin-top: 1px; }
        .ins-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .ins-lbl { font-size: 12px; color: #9BA3C8; }
        .ins-val { font-size: 16px; font-weight: 800; font-family: 'Barlow Condensed', sans-serif; }
        .ins-delta { font-size: 10px; color: #00E564; margin-top: 2px; text-align: right; }
        .pref-row { margin-bottom: 10px; }
        .pref-lbl { font-size: 10px; color: #6B74A8; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 3px; }
        .pref-val { font-size: 12px; color: #9BA3C8; }
        @media(max-width:768px){ .pv-grid{grid-template-columns:1fr;} .stats-strip{grid-template-columns:repeat(4,1fr);} .career-grid{grid-template-columns:repeat(2,1fr);} }
      `}</style>

      <div className="pv-wrap">
        <div className="pv-grid">
          <div className="pv-left">
            {/* Hero Card */}
            <div className="card">
              <div
                className="cover"
                style={{
                  backgroundImage: profile.cover_image
                    ? `url(${profile.cover_image})`
                    : "linear-gradient(135deg,#B026FF,#00E5FF)",
                }}
              />
              <div className="hero-body">
                <div className="avatar-row">
                  {profile.profile_image ? (
                    <img
                      src={profile.profile_image}
                      className="avatar"
                      alt={profile.full_name}
                    />
                  ) : (
                    <div className="avatar-fb">
                      {profile.first_name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div className="hero-name">{profile.full_name}</div>
                    <div className="hero-desig">{profile.designation}</div>
                    {profile.address && (
                      <div className="hero-loc">📍 {profile.address}</div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      paddingBottom: 4,
                    }}
                  >
                    {profile.availability_status === "AVAILABLE" && (
                      <span className="badge-avail">AVAILABLE</span>
                    )}
                    <button className="btn-edit" onClick={onEdit}>
                      ✏ Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="stats-strip">
                {[
                  ["Age", profile.age ?? "—"],
                  ["Height", profile.height ? `${profile.height}m` : "—"],
                  ["Weight", profile.weight ? `${profile.weight}kg` : "—"],
                  ["Nationality", profile.nationality || "—"],
                  ["Pref. Foot", profile.preferred_foot || "—"],
                  ["Date of Birth", fmt(profile.date_of_birth)],
                  ["Jersey No.", profile.jersey_number ?? "—"],
                ].map(([l, v]) => (
                  <div key={l as string} className="sstat">
                    <span className="sstat-val">{v}</span>
                    <span className="sstat-lbl">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            {profile.about && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">About</div>
                  <p
                    style={{ fontSize: 13, lineHeight: 1.7, color: "#9BA3C8" }}
                  >
                    {profile.about}
                  </p>
                </div>
              </div>
            )}

            {/* Career Stats */}
            {profile.career_stats && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    Career Statistics ({profile.career_stats.season} Season)
                  </div>
                  <div className="career-grid">
                    <StatCard
                      label="Matches"
                      value={profile.career_stats.matches ?? 0}
                    />
                    <StatCard
                      label="Goals"
                      value={profile.career_stats.goals ?? 0}
                    />
                    <StatCard
                      label="Assists"
                      value={profile.career_stats.assists ?? 0}
                    />
                    <StatCard
                      label="Minutes"
                      value={(
                        profile.career_stats.minutes ?? 0
                      ).toLocaleString()}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Skills */}
            {profile.skills && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Skills &amp; Attributes</div>
                  <SkillBar label="Pace" value={profile.skills.pace} />
                  <SkillBar label="Shooting" value={profile.skills.shooting} />
                  <SkillBar
                    label="Dribbling"
                    value={profile.skills.dribbling}
                  />
                  <SkillBar label="Passing" value={profile.skills.passing} />
                  <SkillBar label="Physical" value={profile.skills.physical} />
                  <SkillBar
                    label="Technical"
                    value={profile.skills.technical}
                  />
                </div>
              </div>
            )}

            {/* Playing History */}
            {profile.playing_history?.length > 0 && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Playing History</div>
                  {profile.playing_history.map((h: any) => (
                    <div key={h.id} className="hist-item">
                      <div className="hist-dot" />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="hist-club">{h.club_name}</span>
                        <span className="hist-period">
                          {h.start_year} – {h.end_year ?? "Present"}
                        </span>
                      </div>
                      <div className="hist-pos">{h.position}</div>
                      {h.achievements && (
                        <div className="hist-ach">{h.achievements}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlight Videos */}
            {profile.highlight_videos?.length > 0 && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Highlight Videos</div>
                  <div className="videos-grid">
                    {profile.highlight_videos.map((v: any) => (
                      <div key={v.id} className="video-card">
                        <div className="video-thumb">
                          <div className="play-btn">
                            <svg
                              width="12"
                              height="14"
                              viewBox="0 0 12 14"
                              fill="#00E5FF"
                            >
                              <path d="M1 1l10 6-10 6V1z" />
                            </svg>
                          </div>
                        </div>
                        <div className="video-info">
                          <div className="video-ttl">{v.title}</div>
                          <div className="video-sub">{v.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="pv-right">
            {/* Contact */}
            <div className="card">
              <div className="card-body">
                <div className="card-title">Contact Information</div>
                {profile.email && (
                  <div className="contact-item">
                    <div className="c-icon">�</div>
                    <span className="c-text">{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="contact-item">
                    <div className="c-icon">📱</div>
                    <span className="c-text">{profile.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            {(profile.instagram ||
              profile.twitter ||
              profile.facebook ||
              profile.youtube) && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Social Media</div>
                  {profile.instagram && (
                    <div className="social-item">
                      <div
                        className="s-icon"
                        style={{
                          background:
                            "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
                        }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="#fff"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                      <span className="s-hdl">
                        @{handle(profile.instagram)}
                      </span>
                    </div>
                  )}
                  {profile.twitter && (
                    <div className="social-item">
                      <div className="s-icon" style={{ background: "#1DA1F2" }}>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="#fff"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                      <span className="s-hdl">@{handle(profile.twitter)}</span>
                    </div>
                  )}
                  {profile.facebook && (
                    <div className="social-item">
                      <div className="s-icon" style={{ background: "#1877F2" }}>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="#fff"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <span className="s-hdl">{handle(profile.facebook)}</span>
                    </div>
                  )}
                  {profile.youtube && (
                    <div className="social-item">
                      <div className="s-icon" style={{ background: "#FF0000" }}>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="#fff"
                        >
                          <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                        </svg>
                      </div>
                      <span className="s-hdl">@{handle(profile.youtube)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Achievements */}
            {profile.achievements?.length > 0 && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">🏆 Achievements</div>
                  {profile.achievements.map((a: any) => (
                    <div key={a.id} className="ach-item">
                      <div className="ach-dot" />
                      <div>
                        <div className="ach-ttl">{a.title}</div>
                        <div className="ach-date">{fmt(a.date_achieved)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights */}
            {profile.insights && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">📊 Profile Insights</div>
                  <div className="ins-row">
                    <span className="ins-lbl">Profile Views</span>
                    <div style={{ textAlign: "right" }}>
                      <div className="ins-val">
                        {profile.insights.profile_views}
                      </div>
                      <div className="ins-delta">
                        +{profile.insights.profile_views_this_week} this week
                      </div>
                    </div>
                  </div>
                  <div className="ins-row">
                    <span className="ins-lbl">Scout Views</span>
                    <div style={{ textAlign: "right" }}>
                      <div className="ins-val">
                        {profile.insights.scout_views}
                      </div>
                      <div className="ins-delta">
                        +{profile.insights.scout_views_this_week} this week
                      </div>
                    </div>
                  </div>
                  <div className="ins-row">
                    <span className="ins-lbl">Club Interest</span>
                    <div style={{ textAlign: "right" }}>
                      <div className="ins-val">
                        {profile.insights.club_interest} clubs
                      </div>
                      <div className="ins-delta">
                        +{profile.insights.club_interest_this_month} this month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {(profile.preferred_leagues ||
              profile.contract_status ||
              profile.available_from) && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Preferences</div>
                  {profile.preferred_leagues && (
                    <div className="pref-row">
                      <div className="pref-lbl">Preferred Leagues</div>
                      <div className="pref-val">
                        {profile.preferred_leagues}
                      </div>
                    </div>
                  )}
                  {profile.contract_status && (
                    <div className="pref-row">
                      <div className="pref-lbl">Contract Status</div>
                      <div className="pref-val">{profile.contract_status}</div>
                    </div>
                  )}
                  {profile.available_from && (
                    <div className="pref-row">
                      <div className="pref-lbl">Available From</div>
                      <div className="pref-val">
                        {fmt(profile.available_from)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
